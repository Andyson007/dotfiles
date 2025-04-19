import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import { bind, Variable } from "astal"

export const MusicVisibility = Variable(false);

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor
  return <window
    name={"volume_popup"}
    visible={bind(MusicVisibility)}
    cssClasses={["Volume_popup"]}
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
      <Close dir={Gtk.Orientation.VERTICAL} />
    </box >
  </window>
}

function Popup() {
  return <box
    orientation={Gtk.Orientation.VERTICAL}
    cssClasses={[]}
  >
    <label label="test" />
  </box>
}

function Close({ dir }: { dir: Gtk.Orientation }): Gtk.Widget {
  switch (dir) {
    case Gtk.Orientation.HORIZONTAL:
      return <button onClicked={() => MusicVisibility.set(false)} hexpand={true} vexpand={false} />
    case Gtk.Orientation.VERTICAL:
      return <button onClicked={() => MusicVisibility.set(false)} hexpand={false} vexpand={true} />
    default:
      // Unreachable
      return <></>
  }
}
