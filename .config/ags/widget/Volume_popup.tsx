import { App, Astal, Gtk, Gdk, } from "astal/gtk4"
import { bind, Variable } from "astal"
import Wp from "gi://AstalWp"

export const Volume_visibility = Variable(false);

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor
  return <window
    name={"volume_popup"}
    visible={bind(Volume_visibility)}
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

// TODO: Make get_default_speakers() to work. 
// currently it supplies an empty list rather than nothing
function Popup() {
  const speaker = Wp?.get_default()?.audio.get_default_speaker()!;

  return <box cssClasses={["main"]}>
    <Speaker speaker={speaker} />
  </box>
}

function Speaker({ speaker }: { speaker: Wp.Endpoint }) {
  return <box
    orientation={Gtk.Orientation.VERTICAL}
    cssClasses={[]}
  >
    <slider
      orientation={Gtk.Orientation.VERTICAL}
      heightRequest={250}
      inverted={true}
      onChangeValue={({ value }) => speaker.set_volume(value * 1.5)}
      value={bind(speaker, "volume").as(x => x / 1.5)}
    />
    <label cssClasses={["volume"]}
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
  </box>
}

function Close({ dir }: { dir: Gtk.Orientation }) {
  switch (dir) {
    case Gtk.Orientation.HORIZONTAL:
      return <button onClicked={() => Volume_visibility.set(false)} hexpand={true} vexpand={false} />
    case Gtk.Orientation.VERTICAL:
      return <button onClicked={() => Volume_visibility.set(false)} hexpand={false} vexpand={true} />
  }
}
