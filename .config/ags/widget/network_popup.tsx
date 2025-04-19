import { App, Astal, Gtk, Gdk, } from "astal/gtk4"
import { bind, Variable } from "astal"
import Network from "gi://AstalNetwork"

export const Network_visibility = Variable(false);

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor
  return <window
    name={"network_popup"}
    visible={bind(Network_visibility)}
    cssClasses={["network_popup"]}
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.NORMAL}
    anchor={TOP | LEFT | BOTTOM | RIGHT}
    application={App}>
    <box orientation={Gtk.Orientation.VERTICAL}>
      <Close dir={Gtk.Orientation.VERTICAL} />
      <box orientation={Gtk.Orientation.HORIZONTAL}>
        <Popup />
        <Close dir={Gtk.Orientation.HORIZONTAL} />
      </box>
    </box >
  </window>
}

function Popup() {
  const network = Network.get_default()!;
  const wifi = bind(network, "wifi");
  return <box cssClasses={["main"]}>
    <label>{wifi.as(x => bind(x, "ssid").as(x => x.toString()))}</label>
  </box>
}

function Close({ dir }: { dir: Gtk.Orientation }) {
  switch (dir) {
    case Gtk.Orientation.HORIZONTAL:
      return <button onClicked={() => Network_visibility.set(false)} hexpand={true} vexpand={false} />
    case Gtk.Orientation.VERTICAL:
      return <button onClicked={() => Network_visibility.set(false)} hexpand={false} vexpand={true} />
  }
}
