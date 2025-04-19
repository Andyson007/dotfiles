import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk4"
import { bind, GLib, timeout, Variable } from "astal"

export const QsVisibility = Variable(false);

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor
  return <window
    name={"volume_popup"}
    visible={bind(QsVisibility)}
    cssClasses={["Volume_popup"]}
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.NORMAL}
    anchor={TOP | LEFT | BOTTOM | RIGHT}
    application={App}>
    <box orientation={Gtk.Orientation.VERTICAL}>
      <box orientation={Gtk.Orientation.HORIZONTAL}>
        <Popup />
        <Close dir={Gtk.Orientation.HORIZONTAL} />
      </box>
      <Close dir={Gtk.Orientation.VERTICAL} />
    </box >
  </window>
}

function Popup() {
  return <box cssClasses={["main"]}>
    <label label={"test"} />
  </box>
}

function Close({ dir }: { dir: Gtk.Orientation }) {
  switch (dir) {
    case Gtk.Orientation.HORIZONTAL:
      return <button onClicked={() => QsVisibility.set(false)} hexpand={true} vexpand={false} />
    case Gtk.Orientation.VERTICAL:
      return <button onClicked={() => QsVisibility.set(false)} hexpand={false} vexpand={true} />
  }
}
