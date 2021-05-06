# VRChat Join Notifier

This is a tool to display the names of users who have joined the same instance in VRChat.
You can use Windows toast notifications or XSOverlay in-VR notifications for the display.
(To use XSOverlay's notifications, you need to install XSOverlay beforehand.

# Usage

## How to start

Run vrchat-join-notifier.exe in the same folder.
A command prompt will open, so leave it running without closing it.

## How to exit

Close the Command Prompt window.

## Uninstall

Delete the folder that contains this file.

# Configuration file

Edit join-notifier.json in the same folder.
The configuration changes will be applied after restarting the tool.
Configuration items can be omitted. If there is no configuration file, the default settings will be applied.

- interval
Specifies the interval between updates; anything less than 1 second will increase the CPU load.

- specificNames
Specifies the user name to use a different notification sound. (Changing the sound is only effective for toast notifications)

- specificExec
Specifies the command to be executed when the user name specified by specificNames is notified.

- isToast
Switches toast notification on and off.

- isXSOverlay
Toggles XSOverlay notifications on and off.

- xsoverlayVolume
Changes the volume of XSOverlay notifications. (0.0~1.0)

- xsoverlayOpacity
Specifies the transparency of the XSOverlay notification. (0.0~1.0) xsoverlayOpacity

- xsoverlayTimeout
Specifies the amount of time between when the XSOverlay notification is displayed and when it is closed. (seconds)

## Example Config

{
    "interval": "2",
    "specificNames": ["myFriendName1", "myFriendNAme2"],
    "specificExec": "echo ${{names}}",
    "isToast": true,
    "isXSOverlay": true,
    "xsoverlayVolume": "0.5",
    "xsoverlayOpacity": "1.0",
    "xsoverlayTimeout": "3.0",
}

# Disclaimer

Due to VRChat updates, this tool may stop working at an unforeseen time.
The creator is not responsible for any and all problems or damages caused by the use of this tool.

## Link

https://iwanuki.booth.pm/items/2947584
https://github.com/kamakiri01/vrchat-join-notifier
