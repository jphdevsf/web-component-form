import { HeroBanner } from "./components/HeroBanner.js"
import { Notification } from "./components/Notification.js"
import { RandoForm } from "./components/RandoForm.js"
import { defineWebComponents } from "./lib/utils.js"

const components = [RandoForm, HeroBanner, Notification]

defineWebComponents(components)
