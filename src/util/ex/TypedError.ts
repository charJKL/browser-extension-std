

/**
 *
 */
export class TypedError<V>
{
	/**
	 * The sole purpose of this field is to distinguishing different variants of errors. 
	 * Because ITS uses duck typing, there must be unique field for type.
	 */
	// @ts-ignore 
	private readonly $type : V;
}