const MIN_WIDTH= 11;
const MAX_WIDTH= 105;

const MIN_HEIGHT= 2;
const MAX_HEIGHT= 105;

const MIN_LENGHT = 16;
const MAX_LENGHT = 105;

const MIN_SUM_CLA = 29;
const MAX_SUM_CLA = 200;

const orderCart = (cart = null) => {
        if(!Array.isArray(cart))
            return cart;
        
        let _cart = cart.map(item => {
            let newHeight = Math.min( item.height, item.diameter, item.width );
            let newLenght = Math.max( item.height, item.diameter, item.width );
            let temp = [ item.height, item.diameter, item.width ].sort((a,b) => a < b);
            item.width = temp[1];
            item.diameter = newLenght;
            item.height = newHeight;
            item.area = item.width * item.diameter;
            return item;
        });

        return _cart.sort((a,b) => a.area < b.area);

    };
    const calcBox = (cart = null) => { 
        if(!Array.isArray(cart))
            return cart;
        let _cart = orderCart(cart);

        const box = {
            'height': 0, 		 
            'width': 0, 	
            'lenght': 0, 
            'qtd_itens': 0, 	 
            'message': null,  
            'volume': 0, 		
            'volume_itens': 0, 
            'volume_empty': 0, 
            'width_remaining': 0,
            'height_remaining': 0,
            'lenght_remaining': 0,
        }
        if(_cart.length === 0)
            return "Error: empty cart";
        
        _cart.forEach(item => {
            box.qtd_itens += 1;
            box.volume_itens += item.height * item.diameter * item.width;

            if(box.lenght_remaining >= item.diameter && box.width_remaining >= item.width){
                if(item.height > box.height_remaining){
                    box.height += item.height - box.height_remaining;
                }
    
                if(item.diameter > box.lenght){
                    box.lenght = item.diameter;
                }
    
                box.lenght_remaining = box.lenght - item.diameter;

                box.width_remaining = box.width_remaining - item.width;

                box.height_remaining = item.height > box.height_remaining ? item.height : box.height_remaining;

                return;
            }
            box.height += item.height;

            if(item.width > box.width )
                box.width = item.width;
            
            if(item.diameter > box.lenght ) 
                box.lenght = item.diameter;
            
            box.lenght_remaining = box.lenght;
            box.width_remaining = box.width - item.width;
            box.height_remaining = item.height;
        })

        box.volume = ( box.height * box.width * box.lenght );

        box.volume_empty = box.volume - box.volume_itens;

        if(!_cart.length === 0 ){
                if(box.height > 0 && box.height < MIN_HEIGHT )
                    box.height = MIN_HEIGHT;
                if(box.width > 0 && box.width < MIN_WIDTH )
                    box.width = MIN_WIDTH;
                if(box.lenght > 0 && box.lenght < MIN_LENGHT )
                    box.lenght = MIN_LENGHT;    
            }
            
            if( box.height > MAX_HEIGHT )
                box.message = "Error: height bigger than allowed";
            if( box.width > MAX_WIDTH )
                box.message = "Error: width bigger than allowed";
            if( box.lenght > MAX_LENGHT )
                box.message = "Error: lenght bigger than allowed";

            if( (box.lenght+box.lenght+box.lenght) < MIN_SUM_CLA ) 
                box.message = "Error: Sum of the values L+W+H is lower than the allowed";
            
            if( (box.lenght+box.lenght+box.lenght) > MAX_SUM_CLA ) 
                box.message = "Error: Sum of the values L+W+H is bigger than the allowed";    
                
            return box;
    }

module.exports = { calcBox };
