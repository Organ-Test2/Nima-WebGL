import ActorNode from "./ActorNode.js";
import ActorBone from "./ActorBone.js";
import {vec2, mat2d} from "gl-matrix";

export default class ActorJellyBone extends ActorNode
{
	constructor()
	{
		super();

		this._Length = 0;
		this._IsConnectedToImage = false;
	}

	getTipWorldTranslation()
	{
		var transform = mat2d.create();
		transform[4] = this._Length;
		mat2d.mul(transform, this.getWorldTransform(), transform);
		return vec2.set(vec2.create(), transform[4], transform[5]);
	}

	makeInstance(resetActor)
	{
		var node = new ActorJellyBone();
		node.copy(this, resetActor);
		return node;	
	}

	copy(node, resetActor)
	{
		super.copy(node, resetActor);
		this._Length = node._Length;
		this._IsConnectedToImage = node._IsConnectedToImage;
	}

	resolveComponentIndices(components)
	{
		super.resolveComponentIndices(components);
		if(this._Parent && this._Parent.constructor === ActorBone)
		{
			this._Parent._JellyBones.push(this);
		}
	}
}