export function LOG(msg: string, ...payload: any) {
    if (payload === null) {
      payload = 'no payload';
    }
    console.log(`%c === ${msg} ===`, 'background:#008000; color:white;', payload);
  }
  export function DEBUG(msg: string, ...payload: any) {
    console.log(`%c === ${msg} ===`, 'background:#000000; color:white;', payload);
  }
  export function ERROR(msg: string, ...payload: any) {
    console.log(`%c === ${msg} ===`, 'background:#FF0000; color:white;', payload);
  }

  export function ADDELEMENT(
    parentNode: Element,
    element: string,
    msg:any,
    ...payload: any
  ) {
    const node = document.createElement(element);
    if (payload !== null && parent) {
      let time = new Date().toLocaleString("en-US", { timeZone: "EST" })
      node.innerHTML = `${time}&emsp;${msg}  ${payload}`;
    }
    console.log(
      `%c === CREATE ${element} ===`,
      'background:#FF0000; color:white;',
      payload
    );
    parentNode.insertBefore(node, parentNode.firstChild);
    return parentNode;
  }
  