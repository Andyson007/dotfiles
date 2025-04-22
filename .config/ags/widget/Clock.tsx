import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import { Binding, Variable, GLib } from "astal";

function Number({ shown }: { shown: string | Binding<string> }) {
  return (
    <box
      cssClasses={["number-box"]}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
    >
      <stack
        visibleChildName={shown}
        transitionType={Gtk.StackTransitionType.SLIDE_UP}
        transitionDuration={1000}
      >
        {range(9).map((v) => (
          <label name={v.toString()} label={v.toString()} />
        ))}
      </stack>
    </box>
  );
}

function UnitBox({
  label,
  shown1,
  shown2,
}: {
  label: string;
  shown1: string | Binding<string>;
  shown2: string | Binding<string>;
}) {
  return (
    <box vertical cssClasses={["unit"]}>
      <box halign={Gtk.Align.CENTER} hexpand>
        <Number shown={shown1} />
        <Number shown={shown2} />
      </box>
      <label cssClasses={["box-label"]} label={label} />
    </box>
  );
}

export default function DesktopClock() {
  const { RIGHT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      setup={(self) => {
        self.set_default_size(1, 1);
      }}
      visible
      layer={Astal.Layer.BOTTOM}
      name={"clock"}
      namespace={"clock"}
      anchor={BOTTOM | RIGHT}
      application={App}
      cssClasses={["clock"]}
    >
      <box cssClasses={["clock-container"]} spacing={6}>
        <UnitBox
          label={"Hours"}
          shown1={time((t) => t.format("%H")!.split("")[0])}
          shown2={time((t) => t.format("%H")!.split("")[1])}
        />
        <label label={":"} />
        <UnitBox
          label={"Minutes"}
          shown1={time((t) => t.format("%M")!.split("")[0])}
          shown2={time((t) => t.format("%M")!.split("")[1])}
        />
        <label label={":"} />
        <UnitBox
          label={"Seconds"}
          shown1={time((t) => t.format("%S")!.split("")[0])}
          shown2={time((t) => t.format("%S")!.split("")[1])}
        />
      </box>
    </window>
  );
}

const time = Variable(GLib.DateTime.new_now_local()).poll(1000, () =>
  GLib.DateTime.new_now_local(),
);

function range(max: number) {
  return Array.from({ length: max + 1 }, (_, i) => i);
}
