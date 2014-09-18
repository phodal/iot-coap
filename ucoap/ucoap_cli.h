#ifndef __UCOAP_CLI_H__
#define __UCOAP_CLI_H__

#ifdef __cplusplus
extern "C" {
#endif

#include "ucoap.h"

int ucoap_build_con_get_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen);
int ucoap_build_non_get_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen);
int ucoap_build_con_post_pkt(uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen);
int ucoap_build_non_post_pkt(uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen);
int ucoap_build_con_put_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen);
int ucoap_build_non_put_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen);
int ucoap_build_con_del_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen);
int ucoap_build_non_del_pkt (uint8 * buf, int * buflen, uint8 * url, uint8 * data, int datalen);

#ifdef __cplusplus
}
#endif

#endif
