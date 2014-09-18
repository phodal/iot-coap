#include <stdio.h>
#include <stdlib.h>
#include <memory.h>
#include <string.h>
#include "ucoap_cli.h"

static uint16 _message_id = 0;

//
// only suport Uri-Path(0x0B)
// tkl = 0
//

int coap_mini_build(uint8 * buf, int * buflen, uint8 type, uint8 method, uint8 * url, uint8 * data, int datalen)
{
    int opts_len = 0;
    int i = 0;
    uint8 * p = NULL;
    uint8 start_ptr = 0;
	uint8 stop_ptr = 0;
	uint8 last_delta = 0x00;

    buf[0] = (0x01 & 0x03) << 6;
    buf[0] |= (type & 0x03) << 4;
    buf[1] = method;
    buf[2] = (_message_id & 0xFF00) >> 8;
    buf[3] = _message_id & 0x00FF;

    p = buf + 4;

    for (i=0; i<strlen(url); i++)
    {
        if (url[i] == '/' || url[i+1] == '\0')
		{
			stop_ptr = url[i+1] == '\0' ? (i+1) : i;
			opts_len = stop_ptr - start_ptr;

			if (opts_len > 0 && opts_len < 13)
			{
				*p++ = (0xB0 - last_delta) | opts_len;
				last_delta = 0xB0;
			}
			else if (opts_len >= 13 && opts_len < 269)
			{
				*p++ = (0xB0 - last_delta) | 0x0D;
				*p++ = opts_len - 13;
				last_delta = 0xB0;
			}
			else if (opts_len >= 269)
			{
				*p++ = (0xB0 - last_delta) | 0x0E;
				*p++ = ((opts_len - 269) >> 8);
				*p++ = (0xFF & (opts_len - 269));
				last_delta = 0xB0;
			}

			if (opts_len > 0)
			{
				memcpy(p, url + start_ptr, opts_len);
				p += opts_len;
			}

			start_ptr = i + 1;
		}
    }

    if (datalen > 0)
    {
        *p++ = 0xFF;
        memcpy(p, data, datalen);
        p += datalen;
    }
    
    *buflen = p - buf;
	_message_id++;
    return 0;
}

int ucoap_build_con_get_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen)
{
	return coap_mini_build(buf, buflen, COAP_TYPE_CON, COAP_METHOD_GET, url, data, datalen);
}

int ucoap_build_non_get_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen)
{
	return coap_mini_build(buf, buflen, COAP_TYPE_NON, COAP_METHOD_GET, url, data, datalen);
}

int ucoap_build_con_post_pkt(uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen)
{
	return coap_mini_build(buf, buflen, COAP_TYPE_CON, COAP_METHOD_POST, url, data, datalen);
}

int ucoap_build_non_post_pkt(uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen)
{
	return coap_mini_build(buf, buflen, COAP_TYPE_NON, COAP_METHOD_POST, url, data, datalen);
}

int ucoap_build_con_put_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen)
{
	return coap_mini_build(buf, buflen, COAP_TYPE_CON, COAP_METHOD_PUT, url, data, datalen);
}

int ucoap_build_non_put_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen)
{
	return coap_mini_build(buf, buflen, COAP_TYPE_NON, COAP_METHOD_PUT, url, data, datalen);
}

int ucoap_build_con_del_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen)
{
	return coap_mini_build(buf, buflen, COAP_TYPE_CON, COAP_METHOD_DEL, url, data, datalen);
}

int ucoap_build_non_del_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen)
{
	return coap_mini_build(buf, buflen, COAP_TYPE_NON, COAP_METHOD_DEL, url, data, datalen);
}
