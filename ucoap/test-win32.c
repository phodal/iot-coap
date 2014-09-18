#include <winsock2.h>
#include <stdio.h>
#include "ucoap.h"

#define PORT 5683

int main(int argc, char **argv)
{
    int fd;
    struct sockaddr_in servaddr, cliaddr;
    uint8 buf[4096];
    uint8 scratch_raw[4096];
    coap_rw_buffer_t scratch_buf = {scratch_raw, sizeof(scratch_raw)};

#ifdef WIN32
	WSADATA wsa;
	BYTE byMajorVersion = 2, byMinorVersion = 2;
	int result = WSAStartup(MAKEWORD(byMajorVersion, byMinorVersion), &wsa);
	if (result != 0 || LOBYTE(wsa.wVersion) != byMajorVersion || HIBYTE(wsa.wVersion) != byMinorVersion ) 
	{
		if (result == 0) 
		{
			WSACleanup();
		}

		return -1;
	}
#endif

    fd = socket(AF_INET,SOCK_DGRAM,0);

    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(PORT);
    bind(fd,(struct sockaddr *)&servaddr, sizeof(servaddr));

    endpoint_setup();

    while(1)
    {
        int n, rc;
        int len = sizeof(cliaddr);
        coap_packet_t pkt;

        n = recvfrom(fd, buf, sizeof(buf), 0, (struct sockaddr *)&cliaddr, &len);
#ifdef DEBUG
		printf("======================================================================");
        printf("Received: ");
        coap_dump_hex(buf, n, true);
        printf("\n");
#endif

        if (0 != (rc = coap_parse(&pkt, buf, n)))
            printf("Bad packet rc=%d\n", rc);
        else
        {
            size_t rsplen = sizeof(buf);
            coap_packet_t rsppkt;
#ifdef DEBUG
            coap_dumpPacket(&pkt);
#endif
            coap_handle_req(&scratch_buf, &pkt, &rsppkt);

            if (0 != (rc = coap_build(buf, &rsplen, &rsppkt)))
                printf("coap_build failed rc=%d\n", rc);
            else
            {
#ifdef DEBUG
                printf("Sending: ");
                coap_dump_hex(buf, rsplen, true);
                printf("\n");
#endif
#ifdef DEBUG
                coap_dumpPacket(&rsppkt);
#endif

                sendto(fd, buf, rsplen, 0, (struct sockaddr *)&cliaddr, sizeof(cliaddr));
            }
        }
    }

#ifdef WIN32
	WSACleanup();
#endif
}

