#ifndef __UCOAP_SRV_H__
#define __UCOAP_SRV_H__

#ifdef __cplusplus
extern "C" {
#endif

#include "ucoap.h"

typedef enum
{
    COAP_ERR_NONE = 0,
    COAP_ERR_HEADER_TOO_SHORT = 1,
    COAP_ERR_VERSION_NOT_1 = 2,
    COAP_ERR_TOKEN_TOO_SHORT = 3,
    COAP_ERR_OPTION_TOO_SHORT_FOR_HEADER = 4,
    COAP_ERR_OPTION_TOO_SHORT = 5,
    COAP_ERR_OPTION_OVERRUNS_PACKET = 6,
    COAP_ERR_OPTION_TOO_BIG = 7,
    COAP_ERR_OPTION_LEN_INVALID = 8,
    COAP_ERR_BUFFER_TOO_SMALL = 9,
    COAP_ERR_UNSUPPORTED = 10,
    COAP_ERR_OPTION_DELTA_INVALID = 11,
} coap_error_t;

typedef int (*coap_endpoint_func)(coap_rw_buffer_t *scratch, const coap_packet_t *inpkt, coap_packet_t *outpkt, uint8 id_hi, uint8 id_lo);
#define MAX_SEGMENTS 2  // 2 = /foo/bar, 3 = /foo/bar/baz
typedef struct
{
    int count;
    const char *elems[MAX_SEGMENTS];
} coap_endpoint_path_t;

typedef struct
{
    coap_method_t method;
    coap_endpoint_func handler;
    const coap_endpoint_path_t *path;
    const char *core_attr;
} coap_endpoint_t;

void  coap_dumpPacket(coap_packet_t *pkt);
int   coap_parse(coap_packet_t *pkt, const uint8 *buf, size_t buflen);
int   coap_buffer_to_string(char *strbuf, size_t strbuflen, const coap_buffer_t *buf);
const coap_option_t *coap_findOptions(const coap_packet_t *pkt, uint8 num, uint8 *count);
int   coap_build(uint8 *buf, size_t *buflen, const coap_packet_t *pkt);
void  coap_dump(const uint8 *buf, size_t buflen, bool bare);
int   coap_make_response(coap_rw_buffer_t *scratch, coap_packet_t *pkt, const uint8 *content, size_t content_len, uint8 msgid_hi, uint8 msgid_lo, const coap_buffer_t* tok, coap_code_t rspcode, coap_content_type_t content_type);
int   coap_handle_req(coap_rw_buffer_t *scratch, const coap_packet_t *inpkt, coap_packet_t *outpkt);
void  coap_option_nibble(uint8 value, uint8 *nibble);
void  coap_setup(void);
void  endpoint_setup(void);

#ifdef __cplusplus
}
#endif

#endif
