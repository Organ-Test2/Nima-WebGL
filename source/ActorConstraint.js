import ActorComponent from "./ActorComponent.js";

export default class ActorConstraint extends ActorComponent
{
	constructor()
	{
		super();

		this._IsEnabled = true;
		this._Strength = 1.0;
	}

	makeInstance(resetActor)
	{
		var node = new ActorConstraint();
		node.copy(this, resetActor);
		return node;	
	}

	copy(node, resetActor)
	{
		super.copy(node, resetActor);
		this._IsEnabled = node._IsEnabled;
		this._Strength = node._Strength;
	}

	markDirty()
	{
		this.parent.markTransformDirty();
	}

	set strength(c)
	{
		if(this._Strength != c)
		{
			this._Strength = c;
			this.markDirty();
		}
	}

	get isEnabled()
	{
		return this._IsEnabled;
	}

	set isEnabled(isIt)
	{
		if(this._IsEnabled === isIt)
		{
			return;
		}

		this._IsEnabled = isIt;
		this.markDirty();
	}

	resolveComponentIndices(components)
	{
		super.resolveComponentIndices(components);
		if(this.parent)
		{
			this.parent.addConstraint(this);
		}
	}
}