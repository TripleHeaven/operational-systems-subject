# include <signal.h>
#include <fstream>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>
# include <sys/types.h>
# include <sys/stat.h>
#include <stdlib.h>
#include <iostream>
# include <time.h>
# include <pwd.h>

using namespace std;

void catch_signal_parent(int sig_num) {
    cout << "parent signal catched" << endl;
}

void catch_signal_child_killed(int sig_num) {
    cout << "My child killed..."<< endl;
}

void catch_signal_child(int sig_num) {
    cout << "child signal catched" << endl;
}

int main (int argc, char * argv[]) 
{    

    if (!fork()) {
        cout << "child PID =" << getpid() << endl;
        signal(SIGINT, catch_signal_child);
        signal(SIGTERM, SIG_IGN);
        signal(SIGSEGV, SIG_DFL);

                signal(SIGKILL, catch_signal_child_killed);


        pause(); 
    }
    else {
        cout << "parent PID =" << getpid() << endl;
        signal(SIGINT, catch_signal_parent);
        signal(SIGTERM, SIG_IGN);
        signal(SIGSEGV, SIG_DFL);
        signal(SIGCHLD, catch_signal_child_killed);

        pause();
    }

    
    return 0;
}