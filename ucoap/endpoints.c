#include <string.h>
#include "ucoap_srv.h"

static char light = '0';

const uint16 rsplen = 1500;
static char rsp[1500] = "";
void build_rsp(void);

#ifdef ARDUINO
#include "Arduino.h"
static int led = 6;
void endpoint_setup(void)
{                
    pinMode(led, OUTPUT);     
    build_rsp();
}
#else
#include <stdio.h>
void endpoint_setup(void)
{
    build_rsp();
}
#endif

static const coap_endpoint_path_t path_well_known_core = {2, {".well-known", "core"}};
static int handle_get_well_known_core(coap_rw_buffer_t *scratch, const coap_packet_t *inpkt, coap_packet_t *outpkt, uint8 id_hi, uint8 id_lo)
{
    return coap_make_response(scratch, outpkt, (const uint8 *)rsp, strlen(rsp), id_hi, id_lo, &inpkt->tok, COAP_CODE_CONTENT, COAP_CONTENTTYPE_APPLICATION_LINKFORMAT);
}

static const coap_endpoint_path_t path_light = {1, {"light"}};
static int handle_get_light(coap_rw_buffer_t *scratch, const coap_packet_t *inpkt, coap_packet_t *outpkt, uint8 id_hi, uint8 id_lo)
{
    return coap_make_response(scratch, outpkt, (const uint8 *)&light, 1, id_hi, id_lo, &inpkt->tok, COAP_CODE_CONTENT, COAP_CONTENTTYPE_TEXT_PLAIN);
}

static int handle_put_light(coap_rw_buffer_t *scratch, const coap_packet_t *inpkt, coap_packet_t *outpkt, uint8 id_hi, uint8 id_lo)
{
    if (inpkt->payload.len == 0)
        return coap_make_response(scratch, outpkt, NULL, 0, id_hi, id_lo, &inpkt->tok, COAP_CODE_BAD_REQUEST, COAP_CONTENTTYPE_TEXT_PLAIN);
    if (inpkt->payload.p[0] == '1')
    {
        light = '1';
#ifdef ARDUINO
        digitalWrite(led, HIGH);
#else
        printf("ON\n");
#endif
        return coap_make_response(scratch, outpkt, (const uint8 *)&light, 1, id_hi, id_lo, &inpkt->tok, COAP_CODE_CHANGED, COAP_CONTENTTYPE_TEXT_PLAIN);
    }
    else
    {
        light = '0';
#ifdef ARDUINO
        digitalWrite(led, LOW);
#else
        printf("OFF\n");
#endif
        return coap_make_response(scratch, outpkt, (const uint8 *)&light, 1, id_hi, id_lo, &inpkt->tok, COAP_CODE_CHANGED, COAP_CONTENTTYPE_TEXT_PLAIN);
    }
}

const coap_endpoint_t endpoints[] =
{
    {COAP_METHOD_GET, handle_get_well_known_core, &path_well_known_core, "ct=40"},
    {COAP_METHOD_GET, handle_get_light, &path_light, "ct=0"},
    {COAP_METHOD_PUT, handle_put_light, &path_light, NULL},
    {(coap_method_t)0, NULL, NULL, NULL}
};

void build_rsp(void)
{
    uint16 len = rsplen;
    const coap_endpoint_t *ep = endpoints;
    int i;

    len--; // Null-terminated string

    while(NULL != ep->handler)
    {
        if (NULL == ep->core_attr) {
            ep++;
            continue;
        }

        if (0 < strlen(rsp)) {
            strncat(rsp, ",", len);
            len--;
        }

        strncat(rsp, "<", len);
        len--;

        for (i = 0; i < ep->path->count; i++) {
            strncat(rsp, "/", len);
            len--;

            strncat(rsp, ep->path->elems[i], len);
            len -= strlen(ep->path->elems[i]);
        }

        strncat(rsp, ">;", len);
        len -= 2;

        strncat(rsp, ep->core_attr, len);
        len -= strlen(ep->core_attr);

        ep++;
    }
}

