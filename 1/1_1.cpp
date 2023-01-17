#include <fstream>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>
#include <iostream>

using namespace std;

int main (int argc, char * argv[]) {

    cout << "main started " << getpid() << " " << getppid()<< endl;

    for (int i = 0 ; i <= atoi(argv[1]); i++) {
        cout << i << endl;
        if (!fork()) {
            cout << "child started pipID = "<< getpid() << " PPID =" << getppid() << " i=" << i <<  endl;
            sleep(5);
            cout << "child finished pipID =" << getpid() << " PPID=" << getppid() <<  endl;
            exit(1);
        }
    }

    cout << "main finished" << " PID=" <<getpid() << " PPID="<< getppid()<< endl;


    return 0;
}