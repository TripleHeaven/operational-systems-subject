#include <fstream>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>
#include <iostream>
#include <sys/times.h>

using namespace std;

//************************** Bubble Sort **************************************
void bubble (int * v, int size) {
 for (int i=0; i<size; i++){
  for (int j=0; j<size-1; j++){
   if (v[j]>v[j+1]){
    int tmp = v[j];
    v[j] = v[j+1];
    v[j+1] = tmp;
   }
  }
 }
}

//************************** Shell Sort ***************************************
void shell (int * v, int size) {
 int s=0;
 int j=0;
 do {
  s = 3*s+1;
 }while (s<=size);
 do {
  s = (s-1) / 3 + 1;
  for (int i=0; i<size; i++){
   j=i-s;
   int tmp = v[j+s];
   while (j >= 0 && tmp < v[j]) {
    v[j+s] = v[j];
    j -= s;
   }
   v[j+s] = tmp;
  }
 }while (s!=1);
}

//************************** Quick Sort ***************************************
void qs (int * v, int low, int high) {
 int tmp=0;
 int  l = low;
 int r = high;
 int m = v[(l+r) / 2];
 do {
   while (v[l]<m) l++;
   while (v[r]>m) r--;
   if (l<=r){
    tmp = v[l];
    v[l] = v[r];
    v[r] = tmp;
    l++;
    r--;
   }
 }while (l<r);
 if (l<high) qs(v, l, high);
 if (r>low) qs(v,low, r);                                                                                             
}

void quicks (int * v, int size){
  qs (v, 0, size - 1);
}

//------------------------ Save to File -------------------------------------
void save2file (char * fname, int * v, int size) {

  ofstream OutFile(fname);
  for (int i=0; i<size; i++)
    OutFile << v[i] << endl;
  OutFile.close();
}

//===========================================================================


int main (int argc, char * argv[]) {

    int N = atoi(argv[1]);
    int arr[N];

    static clock_t st_time;
    static clock_t en_time;
    static struct tms st_cpu;
    static struct tms en_cpu;


    ofstream CurFile ("file.txt");




    for (int i = 0; i <= N; i++) {
        arr[i] = rand() % 1000;
        CurFile << arr[i] << " ";
    }


    if (!(fork())) {
        st_time = times(&st_cpu);

        CurFile << "bubble"<< endl;

        st_time = times(&st_cpu);

        bubble(arr, N);

        for (int i = 0; i<N;i++) {
            CurFile << arr[i] << " ";
        }

        en_time = times(&en_cpu);

        CurFile << "BUBBLE END "<< endl;
        cout <<"bubble TIME: " << en_cpu.tms_stime - st_cpu.tms_stime   + en_cpu.tms_utime - st_cpu.tms_utime<< endl;

        exit(1);
    }

    if (!(fork())) {
        st_time = times(&st_cpu);
        CurFile << "shell"<< endl;
        shell(arr, N);

        for (int i = 0; i<N;i++) {
            CurFile << arr[i] << " ";
        }

        en_time = times(&en_cpu);


        CurFile << "shell END "<< endl;
        cout <<"shell TIME: " << en_cpu.tms_stime - st_cpu.tms_stime   + en_cpu.tms_utime - st_cpu.tms_utime  << endl;

        exit(1);
    }

if (!(fork())) {
        st_time = times(&st_cpu);
        CurFile << "QS"<< endl;
        quicks(arr, N);

        for (int i = 0; i<N;i++) {
            CurFile << arr[i] << " ";
        }

        en_time = times(&en_cpu);


        CurFile << "QS END "<< endl;
        cout <<"QS TIME: " << en_cpu.tms_stime - st_cpu.tms_stime   + en_cpu.tms_utime - st_cpu.tms_utime<< endl;
        exit(1);
    }

    wait(0);
    wait(0);
    wait(0);

    cout << "main finished";

    CurFile.close();
return 0;
}