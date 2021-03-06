'use strict'

angular.module('playerApp')
  .service('configService', ['restfulContentService', 'config', '$q', 'permissionsService',
    function (restfulContentService, config, $q, permissionsService) {
      /**
     * @class configService
     */
      /**
             * @method getProfileAddInfformElmnt
             * @get form dropdown value
             */

      this.getProfileAddInfformElmnt = function () {
        return {
          'languages': config.PROFILE.languages,
          'subjects': config.DROPDOWN.COMMON.subjects,
          'grades': config.DROPDOWN.COMMON.grades
        }
      }

      /**
             * @method getWorkspaceBookDrpdown
             * @get Create Study Material form dropdown value
             */

      this.getWorkspaceStdMtrlDrpdown = function () {
        return {
          'boards': config.DROPDOWN.COMMON.boards,
          'medium': config.DROPDOWN.COMMON.medium,
          'subjects': config.DROPDOWN.COMMON.subjects,
          'grades': config.DROPDOWN.COMMON.grades,
          'resourceType': config.WORKSPACE.CREATE.RESOURCE.RESOURCE_TYPES
        }
      }

      /**
               * @method getWorkspaceFormDropdown
               * @get workspace form dropdown value
               * @to create Book and lesson plan
               */

      this.getWorkspaceFormDropdown = function () {
        return {
          'boards': config.DROPDOWN.COMMON.boards,
          'medium': config.DROPDOWN.COMMON.medium,
          'subjects': config.DROPDOWN.COMMON.subjects,
          'grades': config.DROPDOWN.COMMON.grades,
          'years': this.getYearsForCreateTextBook()
        }
      }

      /**
               * @method getWorkspaceUpforReviewdrpdwn
               * @get workspace form dropdown value
               * @to filter up for review content
               */

      this.getWorkspaceUpforReviewdrpdwn = function () {
        var data = {
          'boards': config.DROPDOWN.COMMON.boards,
          'medium': config.DROPDOWN.COMMON.medium,
          'languages': config.DROPDOWN.COMMON.languages,
          'subjects': config.DROPDOWN.COMMON.subjects,
          'grades': config.DROPDOWN.COMMON.grades,
          'contentTypes': config.WORKSPACE.UP_FOR_REVIEW.contentTypes
        }
        if (_.indexOf(permissionsService.getCurrentUserRoles(), 'BOOK_REVIEWER') !== -1) {
          data.contentTypes.unshift({
            'key': 'TextBook',
            'value': 'Text Book'
          })
        }
        return data
      }

      /**
               * @method getFilterSearchdrpdwn
               * @get search filter dropdown value
               * @for filter courses and library
               */

      this.getFilterSearchdrpdwn = function () {
        return {
          'boards': config.DROPDOWN.COMMON.boards,
          'medium': config.DROPDOWN.COMMON.medium,
          'subjects': config.DROPDOWN.COMMON.subjects,
          'languages': config.DROPDOWN.COMMON.languages,
          'contentTypes': config.FILTER.RESOURCES.contentTypes,
          'grades': config.DROPDOWN.COMMON.grades,
          'searchTypeKeys': config.searchTypeKeys,
          'sortingOptions': config.sortingOptions,
          'searchSelectionKeys': config.searchSelectionKeys
        }
      }

      /**
               * @method getYearOfPassingValues
               * @get year of passing values
               * @for profile education
               */

      this.getYearOfPassingValues = function () {
        var yearOfPassing = []
        var currentYear = (new Date()).getUTCFullYear()
        for (var i = 1950; i <= currentYear; i++) {
          yearOfPassing.push(i)
        }
        return yearOfPassing.reverse()
      }

      /**
               * @method getYearsForCreateTextBook
               * @get year of passing values
               * @for profile education
               */
      this.getYearsForCreateTextBook = function () {
        var years = []
        var currentYear = (new Date()).getUTCFullYear()
        for (var i = currentYear - 15; i <= currentYear + 5; i++) {
          years.push(i)
        }
        return years.reverse()
      }
    }])
