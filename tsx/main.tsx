export default function Main({ cs }: MainProps) {
  return (
    <>
      <h1>Hello React in CEP</h1>
      <button onClick={() => cs.evalScript("sayHello()")}>Click Me</button>
    </>
  );
}
