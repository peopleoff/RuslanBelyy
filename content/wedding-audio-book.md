---
title: 'The Most Overengineered Wedding Keepsake'
date: '2025-11-28'
description: 'A vintage phone, a Raspberry Pi, a custom enclosure, and a touchscreen UI. All to play 40 voice messages the right way.'
published: '2025-11-28'
---

# Turning a Vintage Phone Into a Wedding Audio Guestbook Player

At our wedding, we had an audio guestbook: one of those old phones where guests pick up the receiver, hear a beep, and leave a message. It was a hit. We ended up with 40 messages from friends and family, some funny, some heartfelt, all of them worth keeping forever.

The only problem? Listening to them.

The vendor gave us a folder of MP3 files. Which is fine, technically. But clicking through `message_001.mp3`, `message_002.mp3` on my laptop didn't feel right. These weren't podcast episodes. They were voices of people we love, recorded on a vintage phone, meant to feel personal and a little bit magical.

The vendor's setup stuck with me: a little box, a vintage phone, software that recorded everything. I've worked with PBXs before, so I thought: what if I built the same thing in reverse? Instead of recording, play them back. Pick up an old phone, use the keypad to skip around. Add a touchscreen to see who left each message.

Here's how the week went.

## The First Question: How Do You Even Do This?

The vendor's setup gave me a starting point. They had a little box, a vintage phone plugged into it, and software that recorded messages. I've worked with PBXs before (Asterisk, FreeSWITCH), so I recognized the pattern: a small computer running SIP, connected to the phone somehow.

My first thought was simple: buy an RJ11 adapter, wire it to the GPIO pins on a Raspberry Pi, and read the signals directly. Turns out that's not a thing. Phone lines use specific voltages and signaling that GPIO pins can't handle without serious hardware in between.

So I dug deeper and found two real options:

**Option 1:** Hack the phone directly. Open it up, wire the speaker and hook switch to GPIO pins, read the keypad matrix, write code to handle everything.

**Option 2:** Use an ATA (Analog Telephone Adapter). This is a box that connects to your network over Ethernet, speaks SIP to a server, and provides a standard phone jack on the other side. Plug any analog phone into it, and as far as the phone knows, it's connected to a real phone line.

Option 1 would work, but it wasn't scalable. If the phone broke, I'd have to rewire everything for a different model. Option 2 was cleaner: the phone stays untouched, and if I ever want to swap it for a different vintage phone, I just unplug and replug.

I ordered a Grandstream HT801 for about $35.

## The Architecture

The setup I landed on:

**Vintage phone → HT801 (RJ11) → Ethernet → Raspberry Pi**

The Pi runs Asterisk, which is open-source PBX software. PBX stands for Private Branch Exchange. Basically, it's a phone company in a box. When you pick up the phone, Asterisk answers the call. When you press buttons, it receives the tones. When it plays audio, you hear it in the handset.

The HT801 handles all the analog weirdness: generating dial tone, detecting when the phone goes off-hook, converting audio between the analog handset and digital RTP packets. The Pi just needs to be a SIP server.

Sounds straightforward. It wasn't.

## Challenge 1: Getting Asterisk Running

First surprise: Asterisk isn't in the Raspberry Pi's default package repositories. There's a project called RasPBX that provides a pre-built image with Asterisk included, but it hadn't been updated since 2020 and ran an old version. I didn't love the idea of starting with something abandoned.

So I compiled from source. This meant installing a dozen dependencies, downloading the Asterisk source code, waiting 20 minutes for it to compile on the Pi's modest CPU, then running a few more commands to install it properly. Then creating a system user, setting permissions on half a dozen directories, and enabling the systemd service.

Not hard, but definitely not a one-liner.

## Challenge 2: Networking

I wanted the Pi and HT801 to talk directly to each other without needing my home router involved. The final setup should be self-contained. Just plug in power and it works.

So I configured the Pi's Ethernet port with a static IP of 192.168.50.1 and set the HT801 to 192.168.50.2 through its web interface. They're on their own little network, completely isolated.

But during development, I still needed to SSH into the Pi. So I kept WiFi connected to my home network. Two interfaces, two networks, one Pi.

Next up: telling Asterisk about the phone. This happens in the PJSIP configuration file:

```ini
[transport-udp]
type=transport
protocol=udp
bind=0.0.0.0

[100]
type=endpoint
context=from-phone
disallow=all
allow=ulaw
auth=100
aors=100
direct_media=no
dtmf_mode=rfc4733

[100]
type=auth
auth_type=userpass
username=100
password=changeme

[100]
type=aor
max_contacts=2
```

This creates an endpoint called "100" that the HT801 can register to. The `dtmf_mode=rfc4733` part is important: it tells Asterisk how to receive button presses from the phone.

The HT801 configuration was its own adventure. The device has a web interface with dozens of settings spread across multiple tabs. The key ones:

- Primary SIP Server: `192.168.50.1`
- SIP User ID: `100`
- Authenticate Password: `changeme`
- Preferred Vocoder: `PCMU`
- Off Hook Auto-Dial: `100`
- Send DTMF: `RFC2833`

That last setting, Off Hook Auto-Dial, means picking up the phone automatically dials extension 100. No dial tone, no waiting for digits. Just pick up and connect.

The first sign of life came when I checked the Asterisk console and saw endpoint "100" listed as "Reachable." The HT801 was registered. Progress.

## Challenge 3: Audio Format Hell

I had 40 WAV files from the vendor. I dropped them into Asterisk's sounds directory, wrote a simple dialplan to play one, picked up the phone, and... silence. Then an error in the logs:

```
File message-00001 does not exist in any format
```

Asterisk is picky about audio formats. It doesn't just want "a WAV file." It wants a very specific kind: PCM encoded, 16-bit, mono, 8kHz. My files were G.711 A-law encoded. Close but not the same.

I used `sox`, a command-line audio tool, to batch convert everything to `.sln` format: raw 8kHz signed linear audio. No headers, no transcoding needed during playback. Just raw samples Asterisk can stream directly to the phone.

Now I heard audio through the handset. Another milestone.

## Challenge 4: The Dialplan

Asterisk's dialplan is where you define what happens when calls come in. It has its own scripting language that's part config file, part programming.

I needed logic for:
- Answer the call when the phone picks up
- Play a greeting
- Wait for button presses
- 4 = previous message, 6 = next, 8 = random
- Keep track of which message we're on

Here's what I ended up with:

```ini
[from-phone]
exten => _X.,1,Answer()
 same => n,Set(TIMEOUT(digit)=0.5)
 same => n,Set(INDEX=0)
 same => n,Set(MAX=39)
 same => n(menu),Background(/var/lib/asterisk/sounds/custom/greeting)
 same => n,WaitExten(10)
 same => n,Goto(menu)

exten => 1,1,Set(INDEX=0)
 same => n,Goto(play,1)

exten => play,1,NoOp()
 same => n(loop),Set(PADDED=${SPRINTF(%05d,${INDEX})})
 same => n,Background(/var/lib/asterisk/sounds/custom/message-${PADDED})
 same => n,WaitExten(10)
 same => n,Goto(loop)

exten => 4,1,Set(INDEX=$[${INDEX} - 1])
 same => n,GotoIf($[${INDEX} < 0]?reset:done)
 same => n(reset),Set(INDEX=0)
 same => n(done),Goto(play,loop)

exten => 6,1,Set(INDEX=$[${INDEX} + 1])
 same => n,GotoIf($[${INDEX} > ${MAX}]?reset:done)
 same => n(reset),Set(INDEX=${MAX})
 same => n(done),Goto(play,loop)

exten => 8,1,Set(INDEX=${RAND(0,${MAX})})
 same => n,Goto(play,loop)

exten => 0,1,Goto(_X.,menu)

exten => h,1,NoOp(Caller hung up)
```

Let me break this down:

- `_X.` matches any dialed number. This catches the initial call
- `Background()` plays audio while listening for button presses
- When you press a button, Asterisk jumps to that extension (4, 6, 8, etc.)
- `INDEX` tracks the current message number
- `SPRINTF(%05d,${INDEX})` pads it to 5 digits so we get `message-00007.sln`
- The 4 and 6 extensions handle bounds checking so you can't go below 0 or above 39

Pick up the phone, hear the greeting, press 8, hear a random message. Magic.

Except for the delay.

## Challenge 5: The Five-Second Mystery

Everything worked, but there was a brutal 4-7 second delay between pressing a button and hearing the next message. Press 8, the current audio stops immediately, then... silence. Then finally the next message starts.

I assumed it was the HT801's fault. Some kind of jitter buffer or audio processing delay. I spent an hour tweaking its settings. Jitter buffer type: fixed vs adaptive. Jitter buffer length: low, medium, high. Nothing helped.

I downloaded a softphone app on my computer and connected it to the same Asterisk server, bypassing the HT801 entirely. Same delay. So it wasn't the hardware.

I dove into Asterisk's debug logs. I watched the timestamps as I pressed buttons. The DTMF tone arrived instantly. Asterisk logged receiving it. Then... nothing for 5 seconds. Then it executed the dialplan.

Why was Asterisk sitting on a received button press for 5 seconds?

I found the answer in Asterisk's timeout documentation. There's a setting called "digit timeout": the amount of time Asterisk waits after receiving a digit to see if more digits are coming. Like when you dial a phone number: it doesn't connect after the first digit, it waits for you to finish.

The default is 5 seconds.

That's why my dialplan starts with:

```ini
same => n,Set(TIMEOUT(digit)=0.5)
```

Half a second. Just enough to register intentional presses, fast enough to feel instant. That one line cost me about 3 hours of debugging.

## Challenge 6: The Enclosure

At this point I had a working prototype: a phone, a Raspberry Pi, an HT801, and a rat's nest of cables. It worked, but it looked like a science project. Not exactly something you'd want sitting on a shelf in your living room.

I wanted a clean, self-contained enclosure. Something that hid all the electronics and cables. Something that looked intentional.

I fired up Fusion 360 and started modeling.

The first problem was the HT801. The thing is huge for what it does. I cracked open the original enclosure it came in, and the actual circuit board inside was maybe 20% of the size of the plastic shell. So I ditched the enclosure entirely, designed a small stand inside my box to hold just the bare board, and suddenly had way more room to work with.

The second problem was power. I didn't want two power cables coming out of this box: one for the Pi, one for the HT801. So I bought a USB powered hub, plugged everything into that, and now there's just one cable. Clean.

Except the USB hub had this massive cable coming out of it that I didn't need, since it was only going to be used for power. I opened it up and saw the cable was just soldered onto the board. Easy fix: desolder it and save the space. An hour later, after a failed desoldering attempt, I gave up and just cut the cable off and taped it. Sometimes the elegant solution isn't worth the time.

This is the reality of hardware projects. You design, print, realize something's wrong, tweak, print again. Each print takes hours. Each iteration teaches you something you should have thought of earlier.

Eventually I landed on something I was happy with. Clean lines, proper ventilation, one power cable in, one phone cable out. Everything tucked away. Just the phone sitting on top.

Or so I thought.

## Challenge 7: The Touchscreen

With the phone working, it was time to add the touchscreen I'd planned from the start. The keypad was great for skipping around, but I wanted a way to see all the messages labeled with names and tap to play. No guessing who left which message.

I had a 7-inch Raspberry Pi touchscreen ready to go. Now I just needed to integrate it.

## Challenge 8: Back to the 3D Printer

Remember that enclosure I spent a week perfecting? It didn't have a touchscreen. Back to Fusion 360.

This wasn't just "add a hole for a screen." The whole design philosophy changed. The original enclosure was meant to hide everything: a closed box with just a phone on top. Now I needed a front-facing display, which meant rethinking the entire form factor.

Where does the screen mount? What angle? How do you access the Pi's ports for debugging? Does the phone still sit on top, or beside it? How do you route the ribbon cable from the display to the Pi without pinching it?

More modeling. More test prints. More iterations. Another week of printing and tweaking. Some prints failed halfway through. Some fit perfectly but looked wrong. Some looked great but didn't actually fit the components.

The final design ended up being almost entirely different from the original. A kiosk-style form factor with the screen angled toward the user, the phone sitting beside it, and all the electronics hidden in the base.

## Challenge 9: Building the Frontend

With the hardware sorted, I needed software. Something that would:

- Display a grid of guests with their names
- Let you tap a name to play their message
- Show what's currently playing
- Update in real-time when the phone is picked up or hung up

I built it as a Node.js app with a Vue frontend. The tricky part was connecting it to Asterisk. You can't just "play a file." You have to interact with an active phone call.

Asterisk has something called AMI (the Asterisk Manager Interface). It's a socket-based API that lets external programs monitor and control calls. When you tap a name on the screen, the app:

1. Finds the active phone channel
2. Sets the INDEX variable to the selected track number
3. Redirects the channel to the playback extension

```javascript
function playTrack(channel, trackNumber) {
  ami.action({
    action: 'Setvar',
    channel: channel,
    variable: 'INDEX',
    value: trackNumber
  });
  
  ami.action({
    action: 'Redirect',
    channel: channel,
    context: 'from-phone',
    exten: 'play',
    priority: 1
  });
}
```

Simple enough in concept. Getting it actually working was another story.

## Challenge 8: Integration Hell

Here's the thing about connecting multiple systems: they all have their own ideas about timing and state.

The phone goes off-hook. Asterisk sees a new channel. The AMI connection gets an event. The frontend updates. But these things don't happen simultaneously. Sometimes the UI would try to play a track before Asterisk had fully set up the channel. Sometimes the channel name would change mid-call and the app would lose track of it.

I added a Server-Sent Events stream so the frontend could react to AMI events in real-time. Then I had to handle reconnection when the AMI socket dropped. Then I realized the channel names weren't consistent and had to parse them differently.

Small bugs everywhere. The kind you only find by actually using the thing. Tap a name, nothing happens. Why? Oh, the phone isn't off-hook. Tap again, works. Tap again, wrong message plays. Why? The INDEX variable hadn't updated yet.

I added debouncing. I added state checks. I added a progress bar that estimates playback time based on file duration. I added a debug panel so I could see what the app thought was happening versus what was actually happening.

## Challenge 10: Making It a Real Kiosk

A web app running on a Pi isn't automatically a kiosk. By default, the Pi boots to a desktop, and you have to manually open a browser. Not exactly plug-and-play.

I set up:

- **PM2** to keep the Node.js app running and restart it if it crashes
- **Cage** (a Wayland compositor) to run Chromium in true kiosk mode with no window decorations, no way to exit
- **A systemd service** to launch everything on boot

Then the small stuff: disable the cursor (it's a touchscreen), disable screen blanking, make sure emoji fonts are installed so the guest icons don't show as squares.

Each of these was a minor thing. But there were a dozen minor things. And each one required a reboot to test, and each reboot took 30 seconds, and some of them broke other things. Classic Pi tinkering.

## The Final Result

What started as "I wonder if I can make this work" turned into a proper piece of furniture. A vintage phone on a custom enclosure, touchscreen mounted on the front, everything self-contained. Plug in power, the screen lights up, pick up the phone, and you're connected.

You can shuffle randomly with the phone keypad like the original design. Or you can tap "Grandma" on the screen and hear exactly that message. Both interfaces work together: if you tap the screen, the phone plays it. If you press buttons on the phone, the screen updates.

The messages sound right: slightly fuzzy, telephone-quality audio, voices coming through a real handset pressed to your ear. It feels the way the guestbook was meant to feel.

We'll keep this thing forever.

## What I Learned

The technical stuff was fun to figure out, but the real lesson was about scope. Every phase of this project added complexity I didn't anticipate:

- "I'll just run Asterisk" → compile from source
- "I'll just play audio" → convert everything to a specific format
- "I'll just use buttons" → debug a 5-second timeout
- "I'll just add a screen" → redesign the entire enclosure
- "I'll just make a UI" → build real-time state synchronization

None of these were hard problems in isolation. But stacked together, they added up fast. Each one had its own rabbit hole to fall into.

But that's also what makes it satisfying. The final result isn't just a thing that works. It's a thing I understand completely, because I debugged every layer of it.

---

If you're interested in building something similar, the basic parts list:

- Raspberry Pi (3B+ or newer)
- Grandstream HT801 (~$35)
- Any analog telephone
- Asterisk (free, open source, compiled from source)
- Optional: 7" touchscreen display
- 3D printer for a custom enclosure
- Patience (lots of it)

It's not plug-and-play. But if you're comfortable with Linux, don't mind debugging, and want to build something genuinely unique, it's a fun ride.