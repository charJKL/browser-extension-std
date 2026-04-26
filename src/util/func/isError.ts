type ErrorType<T> = { new () : T }

export function isError<T extends ErrorType<V>, V>(type: T, value: V) : value is InstanceType<T>
{
    if(value instanceof type) return true;
    return false;
}
