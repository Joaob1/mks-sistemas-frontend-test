export default function getValueFromItem(string: string | undefined){
    const arrayValue: string[] | undefined =
      string?.split("");
    arrayValue?.shift();
    arrayValue?.shift();
    const value: string | undefined = arrayValue?.join("");
    return Number(value);
}