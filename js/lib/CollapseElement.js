/**
 * Utility ES5 class to dynamically collapse an element using rendered fixed heights.
 * 
 * Supports even elements with dynamic heights.
 * 
 * CSS does not support this! That's why there is need of a Javascript CSS injector like this one.
 * 
 * @author Fabio Crispino
 */
var CollapseElement = function(node_name){
    var _node_name;
    var _node_element;
    var _node_start_height;

    /**
     * Initialize data from node.
     * 
     * @param {string} node_name The node name that needs to be dynamically collapsed.
     */
    var init=function(node_name){
        _node_name=node_name;
        _node_element=document.getElementById(_node_name);
        _node_start_height=_node_element.scrollHeight;
    }

    /**
     * Inject CSS into our document setting max_height that we calculated thanks to JS.
     */
    var install_animation=function(){
        var position_old_value = _node_element.style.position;
        if(!position_old_value) position_old_value='relative';
        var css_dynamic_animation = document.createElement('style');
        css_dynamic_animation.type = 'text/css';
        css_dynamic_animation.appendChild(document.createTextNode(
            "#"+node_name+"{overflow:hidden;}\n"+
            "#"+node_name+".hide{"+
                "animation: "+node_name+"_collapse_hide 0.5s forwards;"+
            "}\n"+
            "#"+node_name+".show{"+
                "animation: "+node_name+"_collapse_show 0.5s forwards;"+
            "}\n"+
            "\n"+
            "@keyframes "+node_name+"_collapse_hide{\n"+
            "    0%{margin-top:0px;}\n"+
            "    100%{position: relative; margin-top:-"+_node_start_height+"px;}\n"+
            "}\n"+
            "\n"+
            "@keyframes "+node_name+"_collapse_show{\n"+
            "    0%{margin-top:-"+_node_start_height+"px;}\n"+
            "    100%{position: "+position_old_value+"; margin-top:0px;}\n"+
            "}"
        ));
        document.getElementsByTagName("head")[0].appendChild(css_dynamic_animation);
    }

    var toggle_animation=function(){
        var is_show_there=_node_element.className.indexOf("show")!=-1;
        var is_hide_there=_node_element.className.indexOf("hide")!=-1;
        if(is_show_there && !is_hide_there){
            DOMUtils.toggleClass(_node_element,"show");
            DOMUtils.toggleClass(_node_element,"hide");
        }else if(!is_show_there && is_hide_there){
            DOMUtils.toggleClass(_node_element,"hide");
            DOMUtils.toggleClass(_node_element,"show");
        }else{
            DOMUtils.toggleClass(_node_element,"hide");
        }
    }

    var start_animation=function(){
        var is_show_there=_node_element.className.indexOf("show")!=-1;
        var is_hide_there=_node_element.className.indexOf("hide")!=-1;
        if(is_hide_there) DOMUtils.toggleClass(_node_element,"hide");
        if(!is_show_there) DOMUtils.toggleClass(_node_element,"show");
    }

    var stop_animation=function(){
        var is_show_there=_node_element.className.indexOf("show")!=-1;
        var is_hide_there=_node_element.className.indexOf("hide")!=-1;
        if(is_show_there) DOMUtils.toggleClass(_node_element,"show");
        if(!is_hide_there) DOMUtils.toggleClass(_node_element,"hide");
    }

    /** If constructor has node_name defined, auto-invoke init and install_animation. */
    if(node_name!==undefined){
        init(node_name);
        install_animation();
    }

    /** Public functions. */
    return{
        init: init,
        install_animation: install_animation,
        toggle_animation: toggle_animation,
        start_animation: start_animation,
        stop_animation: stop_animation
    }
}