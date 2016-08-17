import declarity from 'declarity';

const {Entity} = declarity;


class Engine extends Entity {
    static actions = {
        engineTestAction: () => {
            console.log('engineTestAction!!');
        },
        updateCounter: (state, actions) => {
            console.log('updateCounter', state());
            return {...state(), count: state().count + 1}
        }
    }

    /*
    * A special method that returns whatever is to be considered
    */
    create = () => {
        console.log('inside...', this);
        return {
            id: 'engine',
            data: {
                foo: 'bar',
                count: 0
            }
        }
    }

    willMount = () => {
        console.log('willMount Engine', this);
    }

    didMount = () => {
        console.log('didMount Engine');
    }

    update = () => {
        // window.setTimeout(() => {
        //     this.actions.updateCounter();
        // }, 1000)
    }
}

export default Engine;
