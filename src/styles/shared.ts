type Stack<Value> = {
	[key: number | string]: Stack<Value> | Value;
};