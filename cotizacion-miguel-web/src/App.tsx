import { AccordionTab, CotizacionCard, Footer, Navbar } from "./components"
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
          <section>
              <p className="m-0">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                  quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                  sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  Consectetur, adipisci velit, sed quia non numquam eius modi.
              </p>
              <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
          </section>

          </AccordionTab>
        </Accordion>
      </section>
      <Footer />
    </main>
  )
}

export default App