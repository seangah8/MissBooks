import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect } = React


export function UserMassage() {

    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(() => {
                setMsg(null)
            }, 3000);
        })

        return unsubscribe
    }, [])

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return null
    return (
        <section className={`user-masagge ${msg.type}`}>
            <h4>{msg.txt}</h4>
            <button onClick={onCloseMsg} className="close-btn">X</button>
        </section>
    )
}