import style from "../styles/main.module.css"

export default function Main() {
  const cs = new CSInterface();

  return (
    <>
      <h1 className={style.main}>Hello React in CEP</h1>
      <button onClick={() => cs.evalScript("sayHello()")}>Click Me</button>
    </>
  );
}
