import {Pipe} from '@angular/core';

@Pipe({
    name: 'removeTags'
})

export class RemoveTags {
    transform (value, args) {
    return value.replace(/<\/?[^>]+(>|$)/g, "");
    }
}