import { PixiComponent, applyDefaultProps } from '@inlet/react-pixi';
import { DisplayObject } from '@pixi/display'; // Import DisplayObject
import { Spine } from 'pixi-spine';

export default PixiComponent('Spine', {
	config: {
		destroy: true, // we don't want to auto destroy the instance on unmount
		destroyChildren: false, // we also don't want to destroy its children on unmount
	},
	// @ts-ignore
	create: ({ ret }) => {
		// Change the return type to DisplayObject
		const { spineData, loader } = ret;

		const spine = new Spine(spineData);
		spine.skeleton.setSkinByName('default');

		spine.state.setAnimation(0, 'Idling', true);

		for (const [slot, res] of Object.entries(loader.resources)) {
			if (slot.startsWith('spine')) {
				continue;
			}

			let index = spine.skeleton.findSlotIndex(slot);
			let slotObj = spine.skeleton.slots[index];

			if (res.error) {
				console.log('empty ' + slot);
				slotObj.setAttachment(null);
				slotObj.attachment = null;
				continue;
			}

			let textTure = res.texture;

			console.log(textTure);

			if (textTure && slotObj.attachment) spine.hackTextureBySlotName(slot, textTure, textTure.orig);
		}

		//Skin blueSkin = skeletonData.findSkin("blue");

		return spine;
	},
	applyProps: (instance, oldProps, newProps) => {
		const { mixes = [], scale = 1, animationStateCallback, ...newP } = newProps;
		applyDefaultProps(instance, oldProps, newP);
		instance.scale.set(scale);
		mixes.forEach((mix) => instance.stateData.setMix(mix.from, mix.to, mix.duration));

		if (animationStateCallback) {
			//animationStateCallback(instance.state);
			animationStateCallback(instance);
		}
	},
});
