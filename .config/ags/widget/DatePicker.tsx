import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import { bind, Variable } from "astal"

export const DatePickerVisible = Variable(false);

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor
  return <window
    name={"volume_popup"}
    visible={bind(DatePickerVisible)}
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
    </box >
  </window>
}

function Popup() {
  return <box cssClasses={["main", "datemenu-container"]}>
    <Gtk.Calendar show_week_numbers={true} />
  </box>
}

function Close({ dir }: { dir: Gtk.Orientation }) {
  switch (dir) {
    case Gtk.Orientation.HORIZONTAL:
      return <button onClicked={() => DatePickerVisible.set(false)} hexpand={true} vexpand={false} />
    case Gtk.Orientation.VERTICAL:
      return <button onClicked={() => DatePickerVisible.set(false)} hexpand={false} vexpand={true} />
  }
}
