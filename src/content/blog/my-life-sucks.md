---
title: "When 'Customization' Spirals into Chaos: My Linux Adventure Gone Wrong" 
description: "A tale of hubris, hasty decisions, and the surprising resilience of code (and friendship)."
pubDate: "March 31, 2025"
---

March 30th, 2025, started innocently enough. I was riding high, having nearly completed significant changes to a website. A productive morning, a good meal, and then, the fateful thought: "Let's customize my desktop." I was running Ubuntu with Hyprland, feeling pretty slick. 

That's where the chaos began. A simple keybinding tweak, `super + A`, refused to work. Frustration mounted, an hour of fruitless troubleshooting, and then, the impulsive decision: "Hyprland has to go."

Enter ChatGPT, my supposed savior. I asked for commands to remove Hyprland, assuming my Gnome environment would remain untouched. Oh, the naivety. Here's what ChatGPT served up:

```bash
sudo apt update && sudo apt install ubuntu-desktop -y
sudo apt remove --purge hyprland wayland wlogout xdg-desktop-portal-hyprland hyprpaper hypridle hyprlock -y
rm -rf ~/.config/hypr ~/.local/share/hyprland
sudo reboot
```

And poof! My GUI vanished, replaced by a black screen and a lonely white cursor. Panic ensued. I turned to ChatGPT again, hoping for a quick fix:

```bash 
sudo systemctl enable gdm
sudo systemctl restart gdm4
```
I realized then and there: ChatGPT is a powerful tool, but not a substitute for actual Linux knowledge.

Desperate, I sought the aid of a seasoned Linux pro, my friend. The solution? A fresh install. We briefly considered Fedora and Kali, but the allure of Arch Linux was too strong. Four grueling hours later, Arch was up and running, meticulously configured.

Feeling victorious, I headed for dinner. But then, the sinking realization: I couldn't remember my new Arch password. Thankfully, my friend, the Linux wizard, swiftly rectified the situation.

Finally, I was ready to work. I cloned my GitHub repo, only to discover... I hadn't pushed my code. Almost everything was gone. A wave of despair washed over me. I resigned myself to rewriting everything.

And then, the ultimate plot twist. I had pushed my code, just to a different branch, a branch I'd completely forgotten existed. A collective sigh of relief echoed through the room.

This rollercoaster of a day taught me several valuable lessons:

**Don't trust ChatGPT blindly.** It's a tool, not a guru. <br/>
**Always push your code.** Seriously, always. <br/>
**Friends are invaluable, especially tech-savvy ones.** <br/>
**Sometimes, the most frustrating experiences lead to the most valuable learning.** <br/>
**Double check your branches.** <br/>

The journey from a simple configuration tweak to a full Arch Linux install was a wild ride. While I wouldn't recommend replicating my mistakes, I'm grateful for the experience. It reinforced the importance of careful planning, thorough backups, and the incredible support of friends.

So, to all the Linux enthusiasts out there, learn from my mistakes, embrace the challenges, and never underestimate the power of a well-placed backup. And if you need to contact Kamal Koushik Duppalapudi, my linux saviour, you can reach out to me, as he has no website.

Keep coding, keep learning, and remember to push your code!
