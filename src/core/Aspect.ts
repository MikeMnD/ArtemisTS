import MComponent = module("core/Component");
import MComponentType = module("core/ComponentType");

import MList = module("core/utils/List");
import MBag = module("core/utils/Bag");
import MBitSet = module("core/utils/BitSet");

/**
* An Aspect is used by systems as a matcher against entities, to check if a system is
* interested in an entity. Aspects define what sort of component types an entity must
* possess, or not possess.
*
* This creates an aspect where an entity must possess A and B and C:
* Aspect.getAspectForAllOf([A, B, C])
*
* This creates an aspect where an entity must possess A and B and C, but must not possess U or V.
* Aspect.getAspectForAllOf([A, B, C]).exclude([U, V])
*
* This creates an aspect where an entity must possess A and B and C, but must not possess U or V, but must possess one of X or Y or Z.
* Aspect.getAspectForAllOf([A, B, C]).exclude([U, V]).oneOf([X, Y, Z])
*
* You can create and compose aspects in many ways:
* Aspect.getEmpty().oneOf([X, Y, Z]).allOf([A, B, C]).exclude([U, V])
* is the same as:
* Aspect.getAspectForAllOf([A, B, C]).exclude([U, V]).oneOf([X, Y, Z])
*/
export class Aspect {

    private _allSet: MBitSet.BitSet;
    private _exclusionSet: MBitSet.BitSet;
    private _oneSet: MBitSet.BitSet;

    constructor() {
        this._allSet = new MBitSet.BitSet();
        this._exclusionSet = new MBitSet.BitSet();
        this._oneSet = new MBitSet.BitSet();
    }

    public getAllSet(): MBitSet.BitSet {
        return this._allSet;
    }

    public getExclusionSet(): MBitSet.BitSet {
        return this._exclusionSet;
    }

    public getOneSet(): MBitSet.BitSet {
        return this._oneSet
    }


    /**
     * Returns an aspect where an entity must possess all of the specified component types.
     * @param type a required component type
     * @param types a required component type
     * @return an aspect that can be matched against entities
     */
    public all(component: MComponent.Component, componentList?: MList.List): Aspect {
        this._allSet.set(MComponentType.ComponentType.getIndexFor(component));
        for (var i = 0; i < componentList.length; i++) {
            this._allSet.set(MComponentType.ComponentType.getIndexFor(componentList[i]));
        }
        return this;
    }

    /**
   * Excludes all of the specified component types from the aspect. A system will not be
   * interested in an entity that possesses one of the specified exclusion component types.
   *
   * @param type component type to exclude
   * @param types component type to exclude
   * @return an aspect that can be matched against entities
   */
    public exclude(component: MComponent.Component, componentList?: MList.List): Aspect {
        this._exclusionSet.set(MComponentType.ComponentType.getIndexFor(component));

        for (var i = 0; i < componentList.length; i++) {
            this._exclusionSet.set(MComponentType.ComponentType.getIndexFor(componentList[i]));
        }
        return this;
    }


    /**
     * Returns an aspect where an entity must possess one of the specified component types.
     * @param type one of the types the entity must possess
     * @param types one of the types the entity must possess
     * @return an aspect that can be matched against entities
     */
    public one(component: MComponent.Component, componentList?: MList.List): Aspect {
        this._oneSet.set(MComponentType.ComponentType.getIndexFor(component));

        for (var i = 0; i < componentList.length; i++) {
            this._oneSet.set(MComponentType.ComponentType.getIndexFor(componentList[i]));
        }
        return this;
    }

    /**
     * Creates an aspect where an entity must possess all of the specified component types.
     *
     * @param type the type the entity must possess
     * @param types the type the entity must possess
     * @return an aspect that can be matched against entities
     *
     * @deprecated
     * @see getAspectForAll
     */
    public static getAspectFor(component: MComponent.Component, componentList?: MList.List): Aspect {
        return getAspectForAll(component, componentList);
    }

    /**
     * Creates an aspect where an entity must possess all of the specified component types.
     *
     * @param type a required component type
     * @param types a required component type
     * @return an aspect that can be matched against entities
     */
    public static getAspectForAll(component: MComponent.Component, componentList?: MList.List): Aspect {
        var aspect: Aspect = new Aspect();
        aspect.all(component, componentList);
        return aspect;
    }


    /**
     * Creates an aspect where an entity must possess one of the specified component types.
     *
     * @param type one of the types the entity must possess
     * @param types one of the types the entity must possess
     * @return an aspect that can be matched against entities
     */
    public static getAspectForOne(component: MComponent.Component, componentList?: MList.List): Aspect {
        var aspect: Aspect = new Aspect();
        aspect.one(component, componentList);
        return aspect;
    }

    /**
    * Creates and returns an empty aspect. This can be used if you want a system that processes no entities, but
    * still gets invoked. Typical usages is when you need to create special purpose systems for debug rendering,
    * like rendering FPS, how many entities are active in the world, etc.
    *
    * You can also use the all, one and exclude methods on this aspect, so if you wanted to create a system that
    * processes only entities possessing just one of the components A or B or C, then you can do:
    * Aspect.getEmpty().one(A,B,C);
    *
    * @return an empty Aspect that will reject all entities.
    */
    public static getEmpty(): Aspect {
        return new Aspect();
    }


}