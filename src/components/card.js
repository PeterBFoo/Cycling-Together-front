function CardComponent() {
    this.template = `<div class="blog-card">
    <div class="meta">
    <img src="{{photo url}}" alt="bycicle photo" class="photo" height="120" width="200">
      <ul class="details">
        <li class="store">
          <a href="{{store href}}">{{store content}}</a>
        </li>
        <li class="category">
            <a href="{{category href}}">{{category content}}</a>
        </li>
      </ul>
    </div>
    <div class="description">
      <h1>{{title content}}</h1>
      <h2>{{subtitle content}}</h2>
  
      <p>
        {{description content}}
      </p>
      <p class="readMore">
        <a href="{{readMore href}}">{{readMore content}}</a>
      </p>
    </div>
  </div>
  
    `;
    this.props = {
        photo: {
            href: ""
        },
        storeName: {
            href: "",
            content: ""
        },
        category: {
            href: "",
            content: ""
        },
        title: {
            content: ""
        },
        subtitle: {
            content: ""
        },
        description: {
            content: ""
        },
        readMore: {
            href: "",
            content: ""
        }
    }
}

var cardComponent = {
    fillable: {
        photo: {
            href: "{{photo url}}"
        },
        storeName: {
            href: "{{store href}}",
            content: "{{store content}}"
        },
        category: {
            href: "{{category href}}",
            content: "{{category content}}"
        },
        title: {
            content: "{{title content}}"
        },
        subtitle: {
            content: "{{subtitle content}}"
        },
        description: {
            content: "{{description content}}"
        },
        readMore: {
            href: "{{readMore href}}",
            content: "{{readMore content}}"
        }
    },

    fillTemplateAvailabilities: function (availabilities) {
        let cards = [];

        availabilities.forEach((availability) => {
            if (availability.stock != 0) {
                let cardComponent = new CardComponent();
                let template = cardComponent.template;
                let props = cardComponent.props;

                props.photo.href = availability.bycicle.photo;
                props.storeName.href = availability.store.website;
                props.storeName.content = "See the store " + availability.store.storeName;
                props.category.href = "http://localhost:3000/bycicles/get/category/" + availability.bycicle.category;
                props.category.content = "Search all the " + availability.bycicle.category;
                props.title.content = availability.bycicle.model;
                props.subtitle.content = availability.bycicle.brand;
                props.description.content = "Available for " + availability.bycicle.price + "€";
                props.readMore.href = "./bycicle.html?bycicleId=" + availability.bycicle.id + "&storeId=" + availability.store.id;
                props.readMore.content = "See more";

                template = template.replace(this.fillable.storeName.href, props.storeName.href);
                template = template.replace(this.fillable.storeName.content, props.storeName.content);
                template = template.replace(this.fillable.category.href, props.category.href);
                template = template.replace(this.fillable.category.content, props.category.content);
                template = template.replace(this.fillable.title.content, props.title.content);
                template = template.replace(this.fillable.subtitle.content, props.subtitle.content);
                template = template.replace(this.fillable.description.content, props.description.content);
                template = template.replace(this.fillable.readMore.href, props.readMore.href);
                template = template.replace(this.fillable.readMore.content, props.readMore.content);
                template = template.replace(this.fillable.photo.href, props.photo.href);

                cards.push(template);
            }
        });

        return cards;

    }
}