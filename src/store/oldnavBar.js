export const navbarItems = [
  // National Versity
  {
    name: "National University",
    icon: "account_balance",
    link: "",
    role: ["admin"],
    children: [
      {
        name: "Certificate",
        icon: "crop_3_2",
        link: "/centificates/",
        role: ["admin"]
      },
      //exam create
      {
        name: "Exam Create",
        icon: "crop_3_2",
        link: "/exam",
        role: ["admin"]
      },
      //   Business Intelligence
      {
        name: "Business Intelligence",
        icon: "important_devices",
        link: "",
        role: ["admin"],
        children: [
          {
            name: "Basic Report",
            icon: "timeline",
            link: "/biReport",
            role: ["admin"]
          },
          {
            name: "Pass Fail Report",
            icon: "timeline",
            link: "/biPassFail",
            role: ["admin"]
          }
        ]
      },
      //   Script sharing NU <--> RC
      {
        name: "Script Sharing NU and RC",
        icon: "markunread_mailbox",
        link: "",
        role: ["admin"],
        children: [
          {
            name: "Blank Script Distribution",
            icon: "vertical_align_top",
            link: "/nu/bs-dist-to-reg",
            role: ["admin"]
          },
          {
            name: "Answer Script Collection",
            icon: "vertical_align_bottom",
            link: "/nu/as-coll-from-reg",
            role: ["admin"]
          },
          {
            name: "Answer Script Distribution",
            icon: "vertical_align_top",
            link: "/nu/as-dist-to-reg",
            role: ["admin"]
          },
          {
            name: "Marked Answer Script Collection",
            icon: "vertical_align_bottom",
            link: "/nu/as-coll-from-reg-final",
            role: ["admin"]
          },
          {
            name: "Loose Script Collection",
            icon: "vertical_align_bottom",
            link: "/nu/ls-coll-from-reg",
            role: ["admin"]
          }
        ]
      }
    ]
  },
  // regional center
  {
    name: "Regional Center",
    icon: "view_week",
    link: "",
    role: ["admin"],
    children: [
      {
        name: "Regional Center",
        icon: "markunread_mailbox",
        link: "/regional_center",
        role: ["admin"]
      },

      {
        name: "Blank Script NU to Center",
        icon: "markunread_mailbox",
        link: "",
        role: ["admin"],
        children: [
          {
            name: "Collection from NU",
            icon: "vertical_align_bottom",
            link: "/reg-center/bs-coll-from-nu",
            role: ["admin"]
          },
          {
            name: "Distribution to Center",
            icon: "vertical_align_top",
            link: "/reg-center/bs-dist-to-cen",
            role: ["admin"]
          }
        ]
      },
      {
        name: "Answer Script Center to NU",
        icon: "markunread_mailbox",
        link: "",
        role: ["admin"],
        children: [
          {
            name: "Collection from center",
            icon: "vertical_align_bottom",
            link: "/reg-center/as-coll-from-cen",
            role: ["admin"]
          },

          {
            name: "Distribution to NU",
            icon: "vertical_align_top",
            link: "/reg-center/as-dist-to-nu",
            role: ["admin"]
          }
        ]
      },
      {
        name: "Answer Script NU to Examiner",
        icon: "markunread_mailbox",
        link: "",
        role: ["admin"],
        children: [
          {
            name: "Collection from NU",
            icon: "vertical_align_bottom",
            link: "/reg-center/as-coll-from-nu",
            role: ["admin"]
          },
          {
            name: "Distribution to Examiner",
            icon: "vertical_align_top",
            link: "/reg-center/as-dist-to-exam",
            role: ["admin"]
          }
        ]
      },
      {
        name: "Answer Script Examiner to NU",
        icon: "markunread_mailbox",
        link: "",
        role: ["admin"],
        children: [
          {
            name: "Collection from Examiner",
            icon: "vertical_align_bottom",
            link: "/reg-center/as-coll-from-exam",
            role: ["admin"]
          },
          {
            name: "Distribution to NU Final",
            icon: "vertical_align_top",
            link: "/reg-center/as-dist-to-nu-final",
            role: ["admin"]
          }
        ]
      },
      {
        name: "Loose Script Center to NU",
        icon: "markunread_mailbox",
        link: "",
        role: ["admin"],
        children: [
          {
            name: "Collection from Center",
            icon: "vertical_align_bottom",
            link: "/reg-center/ls-coll-from-cen",
            role: ["admin"]
          },
          {
            name: "Distribution to NU",
            icon: "vertical_align_top",
            link: "/reg-center/ls-dist-to-nu",
            role: ["admin"]
          }
        ]
      }
    ]
  },

  // center
  {
    name: "Examination Center",
    icon: "library_books",
    link: "",
    role: ["admin"],
    children: [
      {
        name: "Center Dashboard",
        icon: "dashboard",
        link: "/center/center-dashboard",
        role: ["admin"]
      },
      {
        name: "Center List",
        icon: "list",
        link: "/center/center-list",
        role: ["admin"]
      },
      {
        name: "Center User",
        icon: "people_outline",
        link: "/center/center_user",
        role: ["admin"]
      },
      {
        name: "Blank Script Collection from RC",
        icon: "vertical_align_bottom",
        link: "/center/bs-coll-from-reg",
        role: ["admin"]
      },
      {
        name: "Answer Script Distribution to RC",
        icon: "vertical_align_top",
        link: "/center/as-dist-to-reg",
        role: ["admin"]
      },
      {
        name: "Loose Script Distribution to RC",
        icon: "vertical_align_top",
        link: "/center/ls-dist-to-reg",
        role: ["admin"]
      }
    ]
  },
  //   Invigilator
  {
    name: "Examination Invigilator",
    icon: "account_circle",
    link: "",
    role: ["admin"],
    children: [
      {
        name: "Invigilator List",
        icon: "perm_identity",
        link: "/invigilator-list",
        role: ["admin"]
      },
      {
        name: "Attendance",
        icon: "spellcheck",
        link: "/attendance",
        role: ["admin"]
      }
    ]
  },
  //examiner
  {
    name: "Examiner & Head Examiner",
    icon: "supervisor_account",
    link: "",
    role: ["admin"],
    children: [
      {
        name: "Answer Script from Regional Center",
        icon: "supervised_user_circle",
        link: "",
        role: ["admin"],
        children: [
          {
            name: "Collection",
            icon: "vertical_align_bottom",
            link: "/examiner/as-coll-from-reg",
            role: ["admin"]
          },
          {
            name: "Distribution",
            icon: "vertical_align_top",
            link: "/examiner/as-dist-to-reg",
            role: ["admin"]
          }
        ]
      }
    ]
  },
  //   Practical Viva
  {
    name: "Practical Viva",
    icon: "supervised_user_circle",
    link: "",
    role: ["admin"],
    children: [
      {
        name: "Marks List",
        icon: "list",
        link: "/practical_viva/pv_exam_list",
        role: ["admin"]
      },
      {
        name: "Marks Entry",
        icon: "how_to_reg",
        link: "/practical_viva/pv_marks_entry",
        role: ["admin"]
      }
    ]
  }
  //
];
