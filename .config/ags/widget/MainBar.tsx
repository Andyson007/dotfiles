import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk4"
import { bind, GLib, Variable } from "astal"
import Wp from "gi://AstalWp"
import Network from "gi://AstalNetwork"
import Bluetooth from "gi://AstalBluetooth"
import Mpris from "gi://AstalMpris"
import AstalBattery from "gi://AstalBattery"

import { Volume_visibility } from "./Volume_popup";
import { QsVisibility } from "./QuickSettings";
import { DatePickerVisible } from "./DatePicker";
import { MusicVisibility } from "./MusicPopup";
import { Network_visibility } from "./network_popup"


export const time = Variable(GLib.DateTime.new_now_local()).poll(1000, () =>
  GLib.DateTime.new_now_local(),
);



export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor

  return <window
    visible
    cssClasses={["MainBar"]}
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={TOP | LEFT | BOTTOM}
    application={App}>
    <centerbox orientation={Gtk.Orientation.VERTICAL}>
      <Top />
      <Middle />
      <Bottom />
    </centerbox>
  </window>
}

function Top() {
  return <box vertical>
    <button cssClasses={["Logo"]} onClicked={() => QsVisibility.set(true)}>
      <image
        icon_name={GLib.get_os_info("LOGO")!}
        icon_size={Gtk.IconSize.LARGE}
      />
    </button>
    <Battery />
  </box >
}

function Battery() {
  const battery = AstalBattery.get_default()

  return <box cssClasses={["battery_wrapper"]} orientation={Gtk.Orientation.VERTICAL}>
    {bind(battery, "percentage").as(percentage => {
      let a;
      if (percentage < .10) {
        a = <label label={"\udb80\udc7a"} />
      } else if (percentage < .50) {
        a = <label label={"\udb80\udc7e"} />
      } else {
        a = <label label={"\udb80\udc79"} />
      }
      return <>
        {a}
        <label label={(percentage * 100).toFixed(1)} />
      </>
    })}
  </box>
}

function Middle() {
  return <box vertical>
    <Music />
  </box>
}

function Music() {
  const spotify = Mpris.Player.new("spotify")
  // loop_status
  // volume
  // position
  // playback_status
  // <label label={bind(spotify, "metadata").as(meta => JSON.stringify(meta).toString())} />

  const pos = Variable.derive(
    [bind(spotify, "position"), bind(spotify, "length")], (pos, len) => pos / len
  )
  return <box vertical>
    <button onClicked={() => MusicVisibility.set(true)}>
      {bind(pos).as(pos => <Gtk.ProgressBar fraction={pos} orientation={Gtk.Orientation.VERTICAL} inverted />)}
      {/* <label label={bind(pos).as(pos => pos.toString())} /> */}
    </button>
  </box>
}

function Bottom() {
  return <box orientation={Gtk.Orientation.VERTICAL}>
    <Utils />
    <Time />
  </box>
}

function Utils() {
  return <box orientation={Gtk.Orientation.VERTICAL}>
    <Wifi />
    <BluetoothComp />
    <Volume />
  </box>
}

function Time() {
  return <button onClicked={() => DatePickerVisible.set(true)}>
    <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["Clock"]}>
      <label label={time(t => t.format("%a")!)} cssClasses={["Time", "day"]} />
      <box orientation={Gtk.Orientation.VERTICAL}>
        <label label={time(t => t.format("%H")!)} cssClasses={["Time", "Hour"]} />
        <label label={time(t => t.format("%M")!)} cssClasses={["Time", "Minute"]} />
      </box>
      <label label={time(t => t.format("%d/%m")!)} cssClasses={["Time", "Date"]} />
      <label label={time(t => t.format("%Y")!)} cssClasses={["Time", "Year"]} />
    </box>
  </button>
}

function BluetoothComp() {
  const bluetooth = Bluetooth.get_default()

  const count = Variable(0);

  return <box cssClasses={["bluetooth_wrapper"]} orientation={Gtk.Orientation.VERTICAL}>
    <button>
      {bind(count).as(count => {
        switch (count) {
          case 0:
            return <label label={"\uf294"} />
          case 1:
            return <label label={"\uf294"} cssClasses={["blue"]} />
          default:
            return <box cssClasses={["translate_right"]}>
              <label label={count.toString()} cssClasses={["blue"]} />
              <label label={"\uf294"} cssClasses={["blue"]} />
            </box>
        }
      })}
    </button>
  </box>
}

function Wifi() {
  const network = Network.get_default()!;
  const outer_wifi = bind(network, "wifi");
  return <button onClicked={() => Network_visibility.set(true)}>
    {
      outer_wifi.as(wifi =>
        <box cssClasses={["wifi_wrapper"]} orientation={Gtk.Orientation.VERTICAL}>
          {bind(wifi, "internet").as(network => {
            switch (network) {
              case 2:
                return <label cssClasses={["translate"]} label={"\udb81\uddaa"} />
              case 1:
                return <label label={"\udb85\udec4"} cssClasses={["translate"]} />
              case 0:
                return <>
                  <label cssClasses={["translate"]} label={"\udb81\udda9"} />
                  <label label={bind(wifi, "strength").as(String)} />
                </>
            }
          })}
        </box>)
    }
  </button >
}

function Volume() {
  const speaker = Wp?.get_default()?.audio.defaultSpeaker!;

  const x = Widget.Revealer();
  x.child = <box orientation={Gtk.Orientation.VERTICAL}>
    <slider
      orientation={Gtk.Orientation.VERTICAL}
      heightRequest={200}
      inverted={true}
      onChangeValue={({ value }) => speaker.set_volume(value * 1.5)}
      value={bind(speaker, "volume").as(x => x / 1.5)}
    />
    <label label={bind(speaker, "volume").as(x => (x * 100).toFixed(0))} />
  </box>
  return <box
    orientation={Gtk.Orientation.VERTICAL}
    cssClasses={["volume_wrapper"]}
    onHoverEnter={() => x.revealChild = true}
    onHoverLeave={() => x.revealChild = false}
  >
    {x}
    <button onClicked={() => {
      Volume_visibility.set(true);
    }}>
      <label cssClasses={["volume", "translate"]}
        label={
          bind(speaker, "volume").as(volume => {
            if (volume == 0) {
              return '\uf026'
            } else if (volume <= 2 / 3) {
              return '\uf027'
            } else {
              return '\uf028'
            }
          })
        } />
    </button >
  </box>
}
