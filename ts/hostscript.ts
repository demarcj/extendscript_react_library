import "./library/extendscript/object";
import "./library/extendscript/string";
import "./library/extendscript/array";
import "./library/extendscript/json";
import * as lib from "./library/extendscript/library";

var sayHello = () => alert("Hello from ExtendScript!");

var panel_alert = (message: string) => lib.custom_alert(message);