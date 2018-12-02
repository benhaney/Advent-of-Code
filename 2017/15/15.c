#include <stdio.h>

int main() {
  unsigned long a = 591;
  unsigned long b = 393;
  int c = 0;
  for (int i = 0; i < 4e7; i++) {
    a = (a * 16807) % 2147483647;
    b = (b * 48271) % 2147483647;
    if ((a & 65535) == (b & 65535)) { c++; }
  }
  printf("%d\n", c);

  a = 591;
  b = 393;
  c = 0;
  for (int i = 0; i < 5e6; i++) {
    do { a = (a * 16807) % 2147483647; } while (a % 4);
    do { b = (b * 48271) % 2147483647; } while (b % 8);
    if ((a & 65535) == (b & 65535)) { c++; }
  }
  printf("%d\n", c);
}
