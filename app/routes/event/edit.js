import Ember from "ember";
import { injectForms } from "splitr-lite/utils/inject";

export default Ember.Route.extend({
    eventForm: injectForms("event"),

    model() {
        return Ember.RSVP.hash({
            event: this.modelFor("event"),
            currencies: this.store.findAll("currency")
        });
    },

    setupController(controller, models) {
        models.event = this.get("eventForm").create({ model: models.event });
        this._super(controller, models);
        controller.setProperties({
            event: models.event,
            currencies: models.currencies
        });
    },

    actions: {
        modelUpdated(event) {
            event.save()
                .then(() => this.transitionTo("event.overview"));
        }
    }
});
