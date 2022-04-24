import React from 'react';

interface Props <T> {
    state:T
}
const Calcs  = <T,>({state}:Props<T>) => (
    <div>
        {state}
        Данная страница еще не создана
    </div>
);

export default Calcs;