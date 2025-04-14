import { AccordionTab, CotizacionCard, Footer, Navbar, PagoAnticipado } from "./components"
import "./App.scss"
import { Accordion } from "primereact/accordion"

const App = () => {

  const headerTab = (title: string, icon: string) => {
    return (
      <section className="Page__content__header">
        <p>{title}</p>
        <i className={icon}></i>
      </section>
    )
  }

  return (
    <main className="Page">
      <Navbar />
      <section className="Page__content">
        <Accordion activeIndex={0}>
          <AccordionTab header={headerTab("Cotizacion", "pi pi-wallet")}>
            <CotizacionCard />
          </AccordionTab>
          <AccordionTab header={headerTab("Pago adelantado", "pi pi-forward")}>
            <PagoAnticipado />
          </AccordionTab>
        </Accordion>
      </section>
      <Footer />
    </main>
  )
}

export default App