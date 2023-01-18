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

int main (int argc, char * argv[]) {
    FILE *fp;
    struct stat buff;
    
    struct stat sb;
    stat(argv[1], &sb);
    struct passwd * pwp;
    pwp = getpwuid(sb.st_uid);
    cout << "Имя пользователя: " << pwp->pw_name<< endl;



        if ((fp=fopen(argv[1], "rb")) == NULL) {
            cout << "Не могу открыть файл\n";
            exit(1);
        }
    if (S_ISREG(sb.st_mode)) {
     cout << "File " << argv[1] << " is a regular file" << endl;   
    }
    else if (S_ISDIR(sb.st_mode)) {
     cout << "File " << argv[1] << " is a directory" << endl;   
    }
    else {
        cout << "File " << argv[1] << " unrecognizable" << endl;  
        return 0;
    }


    fstat (fileno (fp), &buff);
    cout << "Permissions = " << buff.st_mode << endl;
    cout << "UID = " << buff.st_uid << endl;
    cout << "GID = " << buff.st_gid << endl;
    cout << "File Size = " << buff.st_size << " Bytes" <<  endl;
    cout << "Access Time = " << ctime(&buff.st_atime) << endl;
    cout << "Modify time = " << ctime(&buff.st_mtime) << endl;
    
    

    fclose(fp);


    return 0;
}