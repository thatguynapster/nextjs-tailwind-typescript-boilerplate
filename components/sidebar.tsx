import { FC, useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { adminMenu } from '../configs/menu'
import { navigate } from '../lib'

const Sidebar: FC<{ pagename: string }> = ({ pagename }) => {
  const [subDomain, setSubDomain] = useState<string | null>(null)
  const [menu, setMenu] = useState(adminMenu)
  const [ready, setReady] = useState<boolean>(false)

  // Subdomains = "admin", "school","teacher", "student", "parent",
  const initialize = () => {
    if (process.browser) {
      let url = window.location.hostname
    }

    setReady(true)
  }

  useEffect(() => {
    initialize()
  }, [subDomain])

  if (!ready) return null
  return (
    <div style={{ padding: 0, margin: 0 }}>
      <div className="sidebar flex-initial bg-green-700">
        <div className="sidebar-sticky">
          <div className="mb-10" style={{ padding: '0em 1em' }}>
            <a className="active sidebar-link" href="/">
              <img src="/assets/img/ananse-main.svg" style={{ width: '60px' }} />
            </a>
          </div>
          <div className="flex flex-col items-center text-center">
            {menu
              .filter((item) => item.show)
              .map((item) => {
                return (
                  <div
                    key={item.pagename}
                    data-tip={item.popup ? item.popup : item.pagename}
                    className="mt-3 mb-3"
                    style={pagename === item.pagename ? styles.menuItem : {}}
                  >
                    <a className="active sidebar-link" href={item.href}>
                      {pagename === item.pagename ? (
                        <img src={item.image} />
                      ) : (
                        <img src={item.image} />
                      )}
                      {/*<small>Home</small>*/}
                    </a>
                  </div>
                )
              })}
            <ReactTooltip className="capitalize" type="dark" />
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  menuItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
    padding: '.5em'
  }
}

export default Sidebar
