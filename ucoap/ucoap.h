#ifndef __UCOAP_H__
#define __UCOAP_H__

#ifdef __cplusplus
extern "C" {
#endif

#include "utypes.h"

#define MAXOPT 16

// http://tools.ietf.org/html/draft-ietf-core-coap-18#section-3
typedef struct
{
    uint8 ver;
    uint8 t;
    uint8 tkl;
    uint8 code;
    uint8 id[2];
} coap_header_t;

typedef struct
{
    const uint8 *p;
    size_t len;
} coap_buffer_t;

typedef struct
{
    uint8 *p;
    size_t len;
} coap_rw_buffer_t;

typedef struct
{
    uint8 num;
    coap_buffer_t buf;
} coap_option_t;

typedef struct
{
    coap_header_t hdr;
    coap_buffer_t tok;
    uint8 numopts;
    coap_option_t opts[MAXOPT];
    coap_buffer_t payload;
} coap_packet_t;

//http://tools.ietf.org/html/draft-ietf-core-coap-18#section-12.2
typedef enum
{
    COAP_OPTION_IF_MATCH = 1,
    COAP_OPTION_URI_HOST = 3,
    COAP_OPTION_ETAG = 4,
    COAP_OPTION_IF_NONE_MATCH = 5,
    COAP_OPTION_OBSERVE = 6,
    COAP_OPTION_URI_PORT = 7,
    COAP_OPTION_LOCATION_PATH = 8,
    COAP_OPTION_URI_PATH = 11,
    COAP_OPTION_CONTENT_FORMAT = 12,
    COAP_OPTION_MAX_AGE = 14,
    COAP_OPTION_URI_QUERY = 15,
    COAP_OPTION_ACCEPT = 17,
    COAP_OPTION_LOCATION_QUERY = 20,
    COAP_OPTION_PROXY_URI = 35,
    COAP_OPTION_PROXY_SCHEME = 39
} coap_option_num_t;

//http://tools.ietf.org/html/draft-ietf-core-coap-18#section-12.1.1
typedef enum
{
    COAP_METHOD_GET = 1,
    COAP_METHOD_POST = 2,
    COAP_METHOD_PUT = 3,
    COAP_METHOD_DEL = 4
} coap_method_t;

//http://tools.ietf.org/html/draft-ietf-core-coap-18#section-12.1.1
typedef enum
{
    COAP_TYPE_CON = 0,
    COAP_TYPE_NON = 1,
    COAP_TYPE_ACK = 2,
    COAP_TYPE_RST = 3
} coap_msgtype_t;

//http://tools.ietf.org/html/draft-ietf-core-coap-18#section-5.2
//http://tools.ietf.org/html/draft-ietf-core-coap-18#section-12.1.2
#define MAKE_CODE(clas, det) ((clas << 5) | (det))
typedef enum
{
	COAP_CODE_GET                          = MAKE_CODE(0, 01), 
	COAP_CODE_POST                         = MAKE_CODE(0, 02), 
	COAP_CODE_PUT                          = MAKE_CODE(0, 03), 
	COAP_CODE_DELETE                       = MAKE_CODE(0, 04), 
	COAP_CODE_CREATED                      = MAKE_CODE(2, 01), 
	COAP_CODE_DELETED                      = MAKE_CODE(2, 02), 
	COAP_CODE_VALID                        = MAKE_CODE(2, 03), 
	COAP_CODE_CHANGED                      = MAKE_CODE(2, 04), 
	COAP_CODE_CONTENT                      = MAKE_CODE(2, 05), 
	COAP_CODE_BAD_REQUEST                  = MAKE_CODE(4, 00), 
	COAP_CODE_UNAUTHORIZED                 = MAKE_CODE(4, 01), 
	COAP_CODE_BAD_OPTION                   = MAKE_CODE(4, 02), 
	COAP_CODE_FORBIDDEN                    = MAKE_CODE(4, 03), 
	COAP_CODE_NOT_FOUND                    = MAKE_CODE(4, 04), 
	COAP_CODE_METHOD_NOT_ALLOWED           = MAKE_CODE(4, 05), 
	COAP_CODE_NOT_ACCEPTABLE               = MAKE_CODE(4, 06), 
	COAP_CODE_PRECONDITION_FAILED          = MAKE_CODE(4, 12), 
	COAP_CODE_REQUEST_ENTITY_TOO_LARGE     = MAKE_CODE(4, 13), 
	COAP_CODE_UNSUPPORTED_CONTENT_FORMAT   = MAKE_CODE(4, 15), 
	COAP_CODE_INTERNAL_SERVER_ERROR        = MAKE_CODE(5, 00), 
	COAP_CODE_NOT_IMPLEMENTED              = MAKE_CODE(5, 01), 
	COAP_CODE_BAD_GATEWAY                  = MAKE_CODE(5, 02), 
	COAP_CODE_SERVICE_UNAVAILABLE          = MAKE_CODE(5, 03), 
	COAP_CODE_GATEWAY_TIMEOUT              = MAKE_CODE(5, 04), 
	COAP_CODE_PROXYING_NOT_SUPPORTED       = MAKE_CODE(5, 05)
} coap_code_t;

//http://tools.ietf.org/html/draft-ietf-core-coap-18#section-12.3
typedef enum
{
    COAP_CONTENTTYPE_NONE = -1, // bodge to allow us not to send option block
    COAP_CONTENTTYPE_TEXT_PLAIN = 0,
    COAP_CONTENTTYPE_APPLICATION_LINKFORMAT = 40,
} coap_content_type_t;

#ifdef __cplusplus
}
#endif

#endif
