type MainProps = {
  cs: CSInterface;
};

export default function Main({ cs }: MainProps) {
  return (
    <div>
      <h1>Hello React in CEP</h1>
      <button onClick={() => cs.evalScript("sayHello()")}>Test</button>
    </div>
  );
}
