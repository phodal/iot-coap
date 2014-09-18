#include <winsock2.h>
#include <stdio.h>
#include "ucoap_cli.h"

int main(int argc, char **argv)
{
    int fd;
    struct sockaddr_in servaddr;

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

    fd = socket(AF_INET, SOCK_DGRAM, 0);
    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
    servaddr.sin_port = htons(5683);

	{
		int len = sizeof(servaddr);
		uint8 buf[512];
		int buflen = 512;
		uint8 data[16] = "I'm linuxkernel";

		ucoap_build_con_get_pkt (buf, &buflen, "/1/12/123/1234/12345", data, 16);
        
		sendto(fd, buf, buflen, 0, (struct sockaddr *)&servaddr, &len);
		
		Sleep(10);
		getchar();
		closesocket(fd);
    }

#ifdef WIN32
	WSACleanup();
#endif
}

