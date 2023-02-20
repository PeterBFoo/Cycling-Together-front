function BycicleComponent() {
    this.template = `
    <div class="bycicle">
        <div class="bycicle__photo">
            <img src="{{photo url}}" alt="bycicle photo">
        </div>
        <div class="bycicle__info">
            <div class="bycicle__info__title">
                <h1>{{title content}}</h1>
            </div>
            <div class="bycicle__info__description">
                <ul>{{description content}}</ul>
            </div>
            <div class="bycicle__info__price">
                <p>{{price content}}</p>
            </div>
            <div class="button-effect">
                <a class="effect effect-5" href="{{booking href}}">{{booking content}}</a>
            </div>
        </div>
    </div>
    `;
    this.props = {
        photo: {
            url: ""
        },
        title: {
            content: ""
        },
        description: {
            content: ""
        },
        price: {
            content: ""
        },
        booking: {
            href: "",
            content: ""
        }
    }
}

var bycicleComponent = {
    fillable: {
        photo: {
            url: "{{photo url}}"
        },
        title: {
            content: "{{title content}}"
        },
        description: {
            content: "{{description content}}"
        },
        price: {
            content: "{{price content}}"
        },
        booking: {
            href: "{{booking href}}",
            content: "{{booking content}}"
        }
    },

    fillTemplate: function (bycicle) {
        let bycicleComponent = new BycicleComponent();
        let template = bycicleComponent.template;
        let props = bycicleComponent.props;

        props.photo.url = bycicle.photo;
        props.title.content = bycicle.model;

        Object.getOwnPropertyNames(bycicle).forEach((property) => {
            if (property !== "photo" && property !== "model" && property !== "price" && property !== "id" && property != "createdAt" && property != "updatedAt" && property != "storeId" && bycicle[property] !== null) {
                props.description.content += `<li><strong>${property.toUpperCase()}</strong>: ${bycicle[property]}</li>`;
            }
        })
        props.price.content = "<strong>" + bycicle.price + "</strong>" + "€ for each day";
        props.booking.href = "./booking.html?bycicleId=" + bycicle.id + "&storeId=" + bycicle.storeId + "&price=" + bycicle.price;
        props.booking.content = "Book now";

        template = template.replace(this.fillable.photo.url, props.photo.url);
        template = template.replace(this.fillable.title.content, props.title.content);
        template = template.replace(this.fillable.description.content, props.description.content);
        template = template.replace(this.fillable.price.content, props.price.content);
        template = template.replace(this.fillable.booking.href, props.booking.href);
        template = template.replace(this.fillable.booking.content, props.booking.content);

        return template;
    }
}