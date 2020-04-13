---
title: Multiplication in the Time Fields
author: Blackmagic Design
alias: time-math
---

The Global Start Time, Render Start Time, Render End Time, Global End Time, and Current Time fields allow you to enter
arithmetic which gets evaluated to make an entry, just like the other numerical entry fields. HOWEVER, multiplication is
not allowed. So while you can do 65+1805 or 452-123 or 2244/24, you can't do 2*2. A workaround is to divide by the
reciprocal. So instead of 10*20, try 10/(1/20). This will return 200, as expected.
