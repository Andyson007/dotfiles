import { App } from "astal/gtk4"
import style from "./style.scss"
import MainBar from "./widget/MainBar"
import VolumePopup from "./widget/Volume_popup"
import QsPopup from "./widget/QuickSettings"
import DatePopup from "./widget/DatePicker"
import MusicPopup from "./widget/MusicPopup"
import NetworkPopup from "./widget/network_popup"

const applications = [
  MainBar,
  VolumePopup,
  QsPopup,
  DatePopup,
  MusicPopup,
  NetworkPopup
]

App.start({
  css: style,
  main() {
    applications.map(app =>
      App.get_monitors().map(app)
    )
  },
})
