export function LOG(msg: string, ...payload: any) {
    console.log(`%c === ${msg} ===`, 'background:#008000; color:white;', payload);
  }
  export function DEBUG(msg: string, ...payload: any) {
    console.log(`%c === ${msg} ===`, 'background:#000000; color:white;', payload);
  }
  export function ERROR(msg: string, ...payload: any) {
    console.log(`%c === ${msg} ===`, 'background:#FF0000; color:white;', payload);
  }