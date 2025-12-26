---
title: 'The $90 Pedal I Built for $20'
date: '2025-12-26'
description: 'Elgato wants $90 for a foot pedal. I wanted to press ALT without breaking everything. So I built my own.'
published: '2025-12-26'
---
# DIY Foot Pedal for Push to Talk

### [The problem](#the-problem)

I use Discord a lot, both for gaming and when I'm programming. My push to talk key is ALT, which seemed like a good idea at the time. The problem is that when I'm in the middle of a game or writing code, pressing ALT to talk means every other key I press becomes an ALT+ shortcut. I'll be trying to tell my friend something and suddenly I've opened a menu, closed a tab, or triggered some random hotkey.

I could just switch to a function key, but those are far away and awkward to hit quickly. I could use voice activation, but then everyone hears my keyboard and whatever YouTube video I forgot to pause. What I really needed was a dedicated key that doesn't conflict with anything.

I saw that Elgato makes a foot pedal for exactly this, but it's $90. That feels illegal. Who is paying $90 for what is essentially one button? So I thought, "I'm overly ambitious and love doing projects I have no idea about." Why can't I just build one?

### [The solution](#the-solution)

The idea is simple: a foot pedal that acts like a keyboard and sends a single key when you press it. Plug it in, it works. No drivers, no software, no configuration.

But what key do I send? I can't use F1-F12 because those already do things. I was googling around and discovered something: F13 through F24 exist. They're valid keycodes that Windows, Mac, and Linux all recognize, but they aren't on any physical keyboard. They're just sitting there, waiting to be used. So I went with F24. It will never conflict with anything because no keyboard has an F24 key.

### [The parts](#the-parts)

This is a pretty minimal build. You only need three things:

* A Pro Micro board (or clone). These have an ATmega32U4 chip with native USB support, so they can act as a keyboard without any extra hardware. About $5-8 for a pack of them.
* A momentary foot switch. I went with a generic SPDT industrial foot switch. It has three terminals but you only use two of them (Common and Normally Open). Around $10-15.
* A micro USB cable to connect it to your computer.

That's it. No resistors, no capacitors, no PCB to design.

### [The wiring](#the-wiring)

The foot switch has three screw terminals labeled Common, Normally Open, and Normally Closed. You only care about the first two.

* One wire goes from the Common terminal to pin 2 on the Pro Micro
* One wire goes from the Normally Open terminal to any GND pin on the Pro Micro

When you press the pedal, it connects these two pins together. That's the whole circuit.

I just soldered the wires directly to the Pro Micro. If you've never soldered before, this is a very forgiving project to learn on. Big holes, no delicate components nearby.

### [The code](#the-code)

The Pro Micro needs a small program to watch for button presses and send the F24 key. Here's the whole thing:

```cpp
#include <Keyboard.h>

const int BUTTON_PIN = 2;
const int DEBOUNCE_MS = 50;

bool lastState = HIGH;
unsigned long lastDebounce = 0;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Keyboard.begin();
}

void loop() {
  bool reading = digitalRead(BUTTON_PIN);
  
  if (reading != lastState && millis() - lastDebounce > DEBOUNCE_MS) {
    lastDebounce = millis();
    lastState = reading;
    
    if (reading == LOW) {
      Keyboard.press(KEY_F24);
    } else {
      Keyboard.release(KEY_F24);
    }
  }
}
```

The debounce code is there because mechanical buttons can "bounce" and register multiple presses when you only pressed once. The 50ms delay smooths that out.

To flash it onto the Pro Micro:

1. Install the Arduino IDE
2. Plug in the Pro Micro
3. Go to Tools, then Board, and select "Arduino Leonardo"
4. Go to Tools, then Port, and select the port that shows up
5. Paste the code and click Upload

Once it's uploaded, the program stays on the Pro Micro forever. You only need the Arduino IDE once. After that, it's a finished product.

### [The result](#the-result)

Plug it into any computer and it just works. Windows, Mac, Linux, doesn't matter. The computer sees it as a keyboard that only has one key.

### [The enclosure](#the-enclosure)

I didn't want the Pro Micro just dangling off the foot switch cable, so I modeled a small housing in Fusion 360 and 3D printed it. Nothing fancy, just a little box that the Pro Micro snaps into with a hole for the USB cable on one end and the foot switch wires on the other. It keeps everything tidy and protected.

### [Final thoughts](#final-thoughts)

Now I can stomp my foot to talk while my hands keep doing whatever they were doing. No more accidentally closing tabs or opening random menus mid-sentence.

Total cost was around $20 and maybe an hour of work. That's a lot better than $90 for the Elgato, and I got to say I built it myself.
